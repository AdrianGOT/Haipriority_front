import api from "../../../../../lib/customInterceptor";
import { CreateLoanInit } from "../interfaces/initLoans";

const complementURL = "/loans/loan";

export const getInitLoans = () => {    
    return api.get(complementURL);
}

export const createInitLoan = ( initLoanInfo: CreateLoanInit ) => {
    return api.post(complementURL, initLoanInfo);
}

// export const updateInitLoan = (initLoanInfo: CreateLoanInit, loanId: number) => {
//     return api.put(`${complementURL}/${loanId}`, initLoanInfo);
// }

// export const deleteInitLoan = (loanId: number) => {
//     return api.delete(`${complementURL}/${loanId}`);
// }
