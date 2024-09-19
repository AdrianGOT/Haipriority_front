export interface LoanComplete {
    id              : number; 
    createdAt       : Date; 
    limitDate       : Date; 
    loan_init       : InitLoan; 
    current_amount  : number;
}

export interface LoanToCreate {
    current_amount : number;
    limitDate      :  Date;
    loanId         :  number;
}

export interface InitLoan {
    id           : number;
    title        : string;
    interest     : number;
    amountAllowed : number;
}