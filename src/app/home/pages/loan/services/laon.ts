import api from "../../../../../lib/customInterceptor";
import { LoanToCreate } from "../interfaces/loan";

const urlComplement = "/loans"

export const getLoans = () => {
    return api.get(urlComplement);
}

export const createLoan = (loanInfo: LoanToCreate) => {
    return  api.post(urlComplement, loanInfo);
}

export const updateLoan = (loanInfo: LoanToCreate, loanId: number) => {
    return api.put(`${urlComplement}/${loanId}`, loanInfo);
}

export const deleteLoan = (loanId: number) => {
    return api.delete(`${urlComplement}/${loanId}`);
} 