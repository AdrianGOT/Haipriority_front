import { createContext, useState } from "react";
import { ClientUpdate, InitClient } from "../interfaces/client.interfaces"
import { clientCheck } from "../services/client";
import { updateClient as updateC } from "../services/client";
import toast from "react-hot-toast";


interface ClientContext {
    client               : InitClient,
    logout               : () => void
    setClient            : (client: InitClient) => void
    updateClient         : (clientInfo: ClientUpdate) => void
    getClientInfoByToken : () => void
}

const clientDefault = {
    createdAt: new Date(),
    email: "",
    id: 0,
    name: "",
    phoneNumber: "",
    state: false,
    roles: []
}


const initialValues: ClientContext = {
    client               : clientDefault,
    logout               : () => {},
    setClient            : (client: InitClient) => {},
    updateClient         : () => {},
    getClientInfoByToken : async() => {},
    
}

export const ClientContext = createContext<ClientContext>(initialValues);

export function ClientProvider({children}: React.PropsWithChildren){
    const [client, setClient] = useState<InitClient>(clientDefault);

    const getClientInfoByToken = async() => {

        const clientResponse = await clientCheck();
        if(!clientResponse.ok) return;
        
        setClient(clientResponse.client)
       
    }

    const logout = () => {
        setClient(clientDefault); 
    }

    const updateClient = async (clientInfo: ClientUpdate) => {
        const clientResponse = await updateC(clientInfo, client.id);

        if(!clientResponse.ok) return;
        
        toast.success(clientResponse.msg);
        setClient( clientResponse.client );
        
    }

    return (
        <ClientContext.Provider value={{
            getClientInfoByToken,
            setClient,
            logout,
            updateClient,
            client,
        }}>    
            {children}
        </ClientContext.Provider>
    )
    
}