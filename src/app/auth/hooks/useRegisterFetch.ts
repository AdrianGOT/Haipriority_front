import { useEffect, useState } from "react";
import { ClientRegister, ClientToSend } from "../../../interfaces/client.interfaces";
import { register } from "../services/auth";


export const useRegisterFetch = (data: ClientRegister | null) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [ finishMsg, setFinishMsg ] = useState<string>("");
    
    useEffect(()=> {

        if(!data) return;
        
        const registerClient = async() => {
            setLoading(true);

            const clientToRegister: ClientToSend = {
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber,
                password: data.password
            }

            try {
                const { msg } = await register(clientToRegister);
                setLoading(false);
                setFinishMsg(msg);

            } catch (error) {
                console.log(error);
                setLoading(false)
            }            
            
        }

        registerClient();

    }, [data])

    return {
        finishMsg,
        loading
    }
}