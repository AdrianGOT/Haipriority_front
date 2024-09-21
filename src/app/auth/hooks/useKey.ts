import { useEffect, useState } from "react"
import { getPublicKey } from "../services/auth"

export const useKey = () => {
    const [publicKey, setPublicKey] = useState<string>("");

    useEffect(()=> {
        const getPublicKeyFunction = async() => {
            const response = await getPublicKey();            
            if(response.ok){
                setPublicKey(response.publicKey);
                localStorage.setItem("publicKey", response.publicKey);
            }
        }
        
        if(isTherePublicKey()) return;

        getPublicKeyFunction();
    }, [])

    const isTherePublicKey = () => {
        const pKey = localStorage.getItem("publicKey") || "";
        if(pKey) setPublicKey(pKey);
        return !!pKey;
    }

    return {
        publicKey
    }

}