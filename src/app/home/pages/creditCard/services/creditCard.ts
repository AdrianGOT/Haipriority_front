import api from "../../../../../lib/customInterceptor";

const complementURL = "/credit-card";

export const getCreditCards = () => {
    return api.get(complementURL);    
}

export const getCards = () => {
    const complement = complementURL + "/card"; 
    return api.get(complement);
}