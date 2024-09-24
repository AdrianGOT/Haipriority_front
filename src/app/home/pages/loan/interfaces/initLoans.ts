export interface InitLoan {
    id           : number;
    title        : string;
    interest     : number;
    amountAllowed : number;
}

export type CreateLoanInit = Omit<InitLoan, "id">