import api from "../../../../../lib/customInterceptor";

const complementURL = "/debit-card";

export const getCards = () => {
    const complement = complementURL + "/card"; 
    return api.get(complement);
}
