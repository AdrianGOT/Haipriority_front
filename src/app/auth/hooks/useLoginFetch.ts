import { useEffect, useState } from "react";
import { ClientLogin } from "../../../interfaces/client.interfaces";
import { setInfo } from "../../helpers/setSessionInfo";
import { login } from "../services/auth";
import { useClient } from "../../hooks/useClient";



export const useLoginFetch = (data: ClientLogin | null) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [ finishMsg, setFinishMsg ] = useState<string>("");
    const { setClient } = useClient();

    
    useEffect(()=> {
        if(!data) return;
        
        const loginClient = async() => {
            setLoading(true);

            try {
        
                const client = await login(data);
                
                if(client.ok){
                    setLoading(false)
                    setFinishMsg("Se ha logeado con exito");
                    setClient(client.client);
                }
                
                
            } catch (error) {
                console.log(error);
                setLoading(false)
            }            
            
        }

        loginClient();

    }, [data])

    return {
        loading,
        finishMsg
    }
}