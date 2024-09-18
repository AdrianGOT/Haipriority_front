import api from "../../../../../lib/customInterceptor";

const urlComplement = "/debit-card"

export const getDebitCards = () => {
    return api.get(urlComplement);
}

export const createDebitCard = (debitCardInfo: any) => {
    return  api.post(urlComplement, debitCardInfo);
}

export const updateDebitCard = (debitCardInfo: any, cardId: number) => {
    return api.put(`${urlComplement}/${cardId}`, debitCardInfo);
}

export const deleteDebitCard = (cardId: number) => {
    return api.delete(`${urlComplement}/${cardId}`);
} 