import api from "../lib/customInterceptor";

export const getSecretKey = () =>{
    const urlComplement = "/config";
    return api.get(urlComplement);
}