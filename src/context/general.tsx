import { createContext, useState } from "react";
import { ClientUpdate, InitClient } from "../app/home/pages/client/interfaces/client.interfaces"
import { clientCheck } from "../services/client";
import { updateClient as updateC } from "../services/client";
import toast from "react-hot-toast";
import { generatePairKey } from "../app/helpers/encryptData";


interface GeneralContext {
    client               : InitClient,
    logout               : () => void
    setClient            : (client: InitClient) => void
    privateKey           : string,
    updateClient         : (clientInfo: ClientUpdate) => void
    getClientInfoByToken : () => void,
    generateKeyToSend    : () => Promise<string | undefined>,
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
    client: clientDefault,
    privateKey: "",
    logout: () => { },
    setClient: () => { },
    updateClient: () => { },
    getClientInfoByToken: async () => { },
    generateKeyToSend: (): Promise<string | undefined> => {
        throw new Error("Function not implemented.");
    }
}

export const GeneralContext = createContext<GeneralContext>(initialValues);

export function GeneralProvider({children}: React.PropsWithChildren){
    const [client, setClient] = useState<InitClient>(clientDefault);
    const [keys, setKeys] = useState({privateKey: "", publicKey: ""});

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

    const generateKeyToSend = async () => {
        if(keys.privateKey) return;

        const keysBase64 = await generatePairKey();
        
        setKeys({
            privateKey: keysBase64.privateKeyBase64,
            publicKey: keysBase64.publicKeyBase64 
        })

        console.log(keysBase64);
        
        return keysBase64.publicKeyBase64;
    }

    return (
        <GeneralContext.Provider value={{
            getClientInfoByToken,
            generateKeyToSend,
            updateClient,
            setClient,
            logout,
            privateKey: keys.privateKey,
            client,
        }}>    
            {children}
        </GeneralContext.Provider>
    )
    
}