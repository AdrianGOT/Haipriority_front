import api from "../../../../../lib/customInterceptor";

const complementURL = "/loans/loan";

export const getInitLoans = () => {    
    return api.get(complementURL);
}

export const createInitLoan = ( initLoanInfo: any ) => {
    return api.post(complementURL, initLoanInfo);
}

export const updateInitLoan = (initLoanInfo: any, loanId: number) => {
    return api.put(`${complementURL}/${loanId}`, initLoanInfo);
}

export const deleteInitLoan = (loanId: number) => {
    return api.delete(`${complementURL}/${loanId}`);
}
