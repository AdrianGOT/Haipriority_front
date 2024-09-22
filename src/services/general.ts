import api from "../lib/customInterceptor";

export const sendPublicKey = (publicKey: string) =>{
    console.log('publicKey ==>', publicKey);
       
    const urlComplement = "/config";
    return api.post(urlComplement, {publicKey});
}