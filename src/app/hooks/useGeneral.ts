import { useContext } from "react"
import { GeneralContext } from "../../context/general"

export const useGeneral = () => {
    const {
        iv,
        logout,
        client, 
        secretKey,
        setClient,
        updateClient,
        getKeyToDecode,
        getClientInfoByToken
    } = useContext(GeneralContext);
    
    return {
        iv,
        client, 
        logout,
        setClient,
        secretKey,
        updateClient,
        getKeyToDecode,
        getClientInfoByToken,
    }
}