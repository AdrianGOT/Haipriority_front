import api from "../../../../../lib/customInterceptor";
import { ClientUpdate } from "../interfaces/client.interfaces";

const urlComplement = "/client";

export const getClients = () => {
    return api.get(urlComplement);
}

export const deleteClient = (clientId: number) => {
    return api.get(`${urlComplement}/${clientId}`);
}

export const toggleState = (clientId: number, stateTo: boolean) => {
    return api.patch(`${urlComplement}/state/${clientId}`, {stateTo});
}