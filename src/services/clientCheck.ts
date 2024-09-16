import api from "../lib/customInterceptor";

export const clientCheck = async () => {
    const urlComplement = "/client/verify";
    return api.get(urlComplement);
} 