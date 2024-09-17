import api from "../../../../../lib/customInterceptor";
import { CreditCardInit } from "../interfaces/creditCard";

const complementURL = "/credit-card";

export const getCreditCards = () => {
    return api.get(complementURL);    
}

export const createCC = (creditCardInfo: CreditCardInit) => {
    return api.post(complementURL, creditCardInfo )
}

export const updateCreditCard = (creditCardInfo: CreditCardInit, cardId: number) => {
    return api.post(`${complementURL}/${cardId}`, creditCardInfo )
}

export const deleteCreditCard = (cardId: number) => {
    return api.delete(`${complementURL}/${cardId}`);
}


