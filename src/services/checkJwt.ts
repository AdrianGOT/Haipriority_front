import api from "../lib/customInterceptor";

export const checkJwt = async () => {
    const urlComplement = "/auth/validate";
    return api.get(urlComplement);
} 