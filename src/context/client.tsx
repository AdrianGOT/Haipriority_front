import { createContext, useState } from "react";
import { InitClient } from "../interfaces/client.interfaces"
import { clientCheck } from "../services/clientCheck";


interface ClientContext {
    client: InitClient,
    setClient: (client: InitClient) => void
    getClientInfoByToken: () => void
    logout: () => void
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
    client: clientDefault,
    setClient: (client: InitClient) => {},
    getClientInfoByToken: async() => {},
    logout: () => {}
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

    return (
        <ClientContext.Provider value={{
            getClientInfoByToken,
            setClient,
            logout,
            client,
        }}>    
            {children}
        </ClientContext.Provider>
    )
    
}