import { useContext } from "react"
import { GeneralContext } from "../../context/general"

export const useGeneral = () => {
    const {
        logout,
        client, 
        setClient,
        privateKey,
        updateClient,
        generateKeyToSend,
        getClientInfoByToken
    } = useContext(GeneralContext);
    
    return {
        client, 
        logout,
        setClient,
        privateKey,
        updateClient,
        generateKeyToSend,
        getClientInfoByToken,
    }
}