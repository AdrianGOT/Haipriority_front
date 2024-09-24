import { createContext, useState } from "react";
import { ClientUpdate, InitClient } from "../app/home/pages/client/interfaces/client.interfaces"
import { clientCheck } from "../services/client";
import { updateClient as updateC } from "../services/client";
import toast from "react-hot-toast";
import { getSecretKey } from "../services/general";


interface GeneralContext {
    iv                   : string
    client               : InitClient,
    logout               : () => void
    setClient            : (client: InitClient) => void
    updateClient         : (clientInfo: ClientUpdate) => void
    getClientInfoByToken : () => void,
    getKeyToDecode       : () => void
    secretKey            : string
}

interface keypair {
    secretKey: string,
    iv: string
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


const initialValues: GeneralContext = {
    iv: "",
    client: clientDefault,
    logout: () => { },
    setClient: () => { },
    secretKey: "",
    updateClient: () => { },
    getClientInfoByToken: async () => { },
    getKeyToDecode: () => {
        throw new Error("Function not implemented.");
    }
}

export const GeneralContext = createContext<GeneralContext>(initialValues);

export function GeneralProvider({children}: React.PropsWithChildren){
    const [client, setClient] = useState<InitClient>(clientDefault);
    const [keys, setKeys] = useState<keypair>({secretKey: "", iv: ""});

    
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

    const getKeyToDecode = async () => {
        const secretResponse = await getSecretKey()
        setKeys({
            secretKey: secretResponse.data.secretKey,
            iv: secretResponse.data.iv
        })
    }

    return (
        <GeneralContext.Provider value={{
            getClientInfoByToken,
            getKeyToDecode,
            updateClient,
            setClient,
            logout,
            secretKey: keys.secretKey,
            client,
            iv: keys.iv
        }}>    
            {children}
        </GeneralContext.Provider>
    )
    
}