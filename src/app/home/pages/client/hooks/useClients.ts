import { useEffect, useState } from "react"
import { 
    getClients,
    toggleState as changeState,
    deleteClient as deleteC,
} from "../services/clients";
import { 
    updateClient as updateC 
} from "../../../../../services/client";
import { 
    register as createC
} from "../../../../auth/services/auth";
import { ClientToSend, ClientUpdate, InitClient } from "../interfaces/client.interfaces";
import toast from "react-hot-toast";

export const useClients = () => {
    const [clients, setClients] = useState<InitClient[]>([]);

    useEffect(() => {
        const getAllClients = async () => {
            const clientResponse = await getClients();

            if(!clientResponse.ok) return;

            setClients(clientResponse.clients);
        }

        getAllClients();
    }, [])

    const deleteClient = async (clientId: number) => {
        const clientsResponse = await deleteC(clientId);

        if(!clientsResponse.ok) return;
        toast.success(clientsResponse.msg);

        setClients(preVClients => 
            preVClients.filter(client => 
                client.id !== clientId
            )
        )
    }

    const updateClient = async (clientInfo: ClientUpdate, clientId: number) => {
        const clientsResponse = await updateC(clientInfo, clientId);
        
        if(!clientsResponse.ok) return;
        toast.success(clientsResponse.msg);

        const clienteUpdated = clientsResponse.client;

        setClients(prevClients => 
            prevClients.map( client => 
                client.id === clientId? 
                    clienteUpdated
                    : client  
            )
        )

    }

    const createClient = async (clientInfo: ClientToSend) => {
        const clientsResponse = await createC(clientInfo);
        
        if(!clientsResponse.ok) return;
        
        setClients(prevClients => 
            [...prevClients, clientsResponse.client]
        )
    }

    const toggleState = async (clientId: number, stateTo: boolean) => {
        
        const clientsResponse = await changeState(clientId, stateTo );
        if(!clientsResponse.ok) return;

        toast.success(clientsResponse.msg);

        setClients(prevClients => 
            prevClients.map(client => 
                {
                    if(client.id === clientId) {
                        client.state = stateTo;
                    }
                    return client;
                }
            )
        )
    }

    return {
        clients,
        deleteClient,
        updateClient,
        createClient,
        toggleState
    }
}