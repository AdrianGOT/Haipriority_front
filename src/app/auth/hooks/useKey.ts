import { useEffect, useState } from "react"
import { getPublicKey } from "../services/auth"

export const useKey = () => {
    const [publicKey, setPublicKey] = useState<string>("");

    useEffect(()=> {
        const getPublicKeyFunction = async() => {
            const response = await getPublicKey();
            if(response.ok){
                setPublicKey(response.publicKey);
            }
        }
        
        getPublicKeyFunction();
    }, [])

    return {
        publicKey
    }

}