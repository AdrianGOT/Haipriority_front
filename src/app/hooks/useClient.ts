import { useContext } from "react"
import { ClientContext } from "../../context/client"

export const useClient = () => {
    const {
        client, 
        setClient, 
        getClientInfoByToken
    } = useContext(ClientContext);
    
    return {
        client, 
        setClient,
        getClientInfoByToken,
    }
}