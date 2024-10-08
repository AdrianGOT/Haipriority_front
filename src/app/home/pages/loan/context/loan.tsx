import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { 
    getLoans,
    createLoan as createL,
    updateLoan as updateL, 
    deleteLoan as deleteL, 

} from "../services/laon";
import {
    getInitLoans as getIloans,
    createInitLoan as createILoan
} from "../services/loanInit"
import { LoanComplete, LoanToCreate } from "../interfaces/loan";
import { CreateLoanInit, InitLoan } from "../interfaces/initLoans";

interface LoanContext {
    loans          : LoanComplete[];
    initLoans      : InitLoan[];
    createInitLoans: (loainInfo: CreateLoanInit) => void;
    getClientLoans : () => void;
    getInitLoans   : () => void;
    createLoan     : (loanInfo: LoanToCreate, initLoan: InitLoan) => void;
    updateLoan     : (loanInfo: LoanToCreate, loan: number) => void;
    deleteLoan     : (loanId: number) => void;

}

const initialValues: LoanContext = {
    loans          : [],
    initLoans      : [],
    getClientLoans : () =>{},
    getInitLoans   : () => {},
    createLoan     : () => {},
    updateLoan     : () => {},
    deleteLoan     : () => {},
    createInitLoans: () => {},

}

export const LoanContext = createContext(initialValues);

export const LoanProvider = ({children}: React.PropsWithChildren) => {
    const [loans, setLoans] = useState<LoanComplete[]>([]);
    const [initLoans, setInitLoans] = useState<InitLoan[]>([]);

    const getClientLoans = async () => {    
        const loanResponse = await getLoans();
        if(!loanResponse.ok) return;
        
        setLoans(loanResponse.loans)
    }

    const createLoan = async (loanInfo: LoanToCreate, initLoan: InitLoan) => {

        const loanResponse = await createL(loanInfo);

        if(!loanResponse.ok) return;
    
        toast.success(loanResponse.msg);
        
        setLoans(prevLoans => [...prevLoans, {
            ...loanResponse.loan,
            loan_init: initLoan
        }])
    }

    const updateLoan = async (loanInfo: LoanToCreate, loanId: number) => {
        const loanResponse = await updateL(loanInfo, loanId);

        if(!loanResponse.ok) return;

        toast.success(loanResponse.msg);
        
        setLoans(prevLoans => 
            prevLoans.map( loan => 
                loan.id === loanId? loanResponse.loan : loan
            )
        )
    }

    const deleteLoan = async (loanId: number) => {
        
        const loanResponse = await deleteL(loanId);
        
        if(!loanResponse.ok) return;

        toast.success(loanResponse.msg);

        setLoans(prevLoans => 
            prevLoans.filter(loan => 
                loan.id !== loanId
            )
        )

    }
    
    // ======================

    const getInitLoans = async () => {
        const loanResponse = await getIloans();
        if(!loanResponse.ok) return;
        setInitLoans(loanResponse.loans)
    }

    const createInitLoans = async (loainInfo: CreateLoanInit) => {
        const loanResponse = await createILoan(loainInfo);

        if(!loanResponse.ok) return;

        toast.success(loanResponse.msg);

        setInitLoans(prevLoans => 
            [...prevLoans, loanResponse.loan]
        )
    }


    return (
        <LoanContext.Provider value={{
            loans,
            initLoans,
            createLoan,
            updateLoan,
            deleteLoan,
            getInitLoans,
            getClientLoans,
            createInitLoans,
        }}>
            {children}
        </LoanContext.Provider>
    )
}
