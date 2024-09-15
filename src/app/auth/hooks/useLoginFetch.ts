import { useEffect, useState } from "react";
import { ClientLogin } from "../../../interfaces/client.interfaces";
import { setInfo } from "../../helpers/setSessionInfo";
import { login } from "../services/auth";



export const useLoginFetch = (data: ClientLogin | null) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [ finishMsg, setFinishMsg ] = useState<string>("");

    
    useEffect(()=> {
        if(!data) return;
        
        const loginClient = async() => {
            setLoading(true);

            try {
                
                const client = await login(data);
                // setInfo(client); // TODO Es para asignar el valor a donde se haya que asignar, posiblemente a un estado global.
                setLoading(false)
                setFinishMsg("Se ha logeado con exito");

                
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