import { ClientLogin, ClientToSend } from "../../../interfaces/client.interfaces";
import api  from "../../../lib/customInterceptor";


export const login = async ( clientInfo: ClientLogin ) => {
    const urlComplement = "/auth/login";
    return api.post(urlComplement, clientInfo);
}

export const register = async ( clientInfo: ClientToSend ) => {
    const urlComplement = "/client";
    return api.post(urlComplement, clientInfo);
}

export const getPublicKey = () => {
    const urlComplement = "/auth/public-key";
    return api.get(urlComplement);
}