import { ClientUpdate } from "../interfaces/client.interfaces";
import api from "../lib/customInterceptor";

export const clientCheck = async () => {
    const urlComplement = "/client/verify";
    return api.get(urlComplement);
}

export const updateClient = (clientInfo: ClientUpdate, clientId: number) => {
    const urlComplement = `/client/${clientId}`;
    return api.put(urlComplement, clientInfo);
}