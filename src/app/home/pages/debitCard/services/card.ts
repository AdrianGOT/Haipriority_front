import api from "../../../../../lib/customInterceptor";
import { CreateCard } from "../interfaces/card";

const complementURL = "/debit-card";

export const getCards = () => {
    const complement = complementURL + "/card"; 
    return api.get(complement);
}

export const createCard = (data: CreateCard) => {
    const complement = complementURL + "/card"; 
    return api.post(complement, data);
}
