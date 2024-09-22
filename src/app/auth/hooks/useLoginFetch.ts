import { useEffect, useState } from "react";
import { ClientLogin } from "../../home/pages/client/interfaces/client.interfaces";
import { login } from "../services/auth";
import { useGeneral } from "../../hooks/useGeneral";

export const useLoginFetch = (data: ClientLogin | null) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [ finishMsg, setFinishMsg ] = useState<string>("");
    const { setClient } = useGeneral();

    
    useEffect(()=> {
        if(!data) return;
        
        const loginClient = async() => {
            setLoading(true);

            try {
        
                const client = await login(data);
                
                if(client.ok){
                    setFinishMsg("Se ha logeado con exito");
                    setClient(client.client);
                    setLoading(false)
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