import { createContext, useState } from "react";
import { InitClient } from "../interfaces/client.interfaces"
import { clientCheck } from "../services/clientCheck";


interface ClientContext {
    client: InitClient,
    setClient: (client: InitClient) => void
    getClientInfoByToken: () => void
}

const clientDefault = {
    id: 0,
    name: "",
    email: "",
    roles: "",
    phoneNumber: ""
}

const initialValues: ClientContext = {
    client: clientDefault,
    setClient: (client: InitClient) => {},
    getClientInfoByToken: async() => {}
}

export const ClientContext = createContext<ClientContext>(initialValues);

export function ClientProvider({children}: React.PropsWithChildren){
    const [client, setClient] = useState<InitClient>(clientDefault);

    const getClientInfoByToken = async() => {

        const clientResponse = await clientCheck();
        if(!clientResponse.ok) return;
        
        setClient(clientResponse.client)
       
    }

    return (
        <ClientContext.Provider value={{
            getClientInfoByToken,
            setClient,
            client,
        }}>    
            {children}
        </ClientContext.Provider>
    )
    
}