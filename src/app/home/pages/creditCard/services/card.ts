import api from "../../../../../lib/customInterceptor";
import { CreatCard } from "../interfaces/card";

const complementURL = "/credit-card";

export const getCards = () => {
    const complement = complementURL + "/card"; 
    return api.get(complement);
}

export const createCard = (cardToCreate : CreatCard) => {
    const complement = complementURL + "/card"; 
    return api.post(complement, cardToCreate );
}

// Make the others methos!