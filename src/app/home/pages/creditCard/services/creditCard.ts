import api from "../../../../../lib/customInterceptor";
import { CreatingCard, CreditCard, CreditCardInit } from "../interfaces/creditCard";

const complementURL = "/credit-card";

export const getCreditCards = () => {
    return api.get(complementURL);    
}

export const createCC = (creditCardInfo: CreditCardInit) => {
    return api.post(complementURL, creditCardInfo )
}

export const updateCreditCard = (creditCard: CreatingCard, cardId: number) => {
    return api.put(`${complementURL}/${cardId}`, creditCard )
}

export const deleteCreditCard = (cardId: number) => {
    return api.delete(`${complementURL}/${cardId}`);
}


