import api from "../../../../../lib/customInterceptor";

const complementURL = "/credit-card";

export const getCards = () => {
    const complement = complementURL + "/card"; 
    return api.get(complement);
}
