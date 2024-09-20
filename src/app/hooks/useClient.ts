import { useContext } from "react"
import { ClientContext } from "../../context/client"

export const useClient = () => {
    const {
        logout,
        client, 
        setClient,
        updateClient,
        getClientInfoByToken
    } = useContext(ClientContext);
    
    return {
        client, 
        logout,
        setClient,
        updateClient,
        getClientInfoByToken,
    }
}