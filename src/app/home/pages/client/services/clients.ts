import api from "../../../../../lib/customInterceptor";

const urlComplement = "/client";

export const getClients = () => {
    return api.get(urlComplement);
}

export const deleteClient = (clientId: number) => {
    return api.delete(`${urlComplement}/${clientId}`);
}

export const toggleState = (clientId: number, stateTo: boolean) => {
    return api.patch(`${urlComplement}/state/${clientId}`, {stateTo});
}