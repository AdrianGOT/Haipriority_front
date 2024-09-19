import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { 
    getLoans,
    createLoan as createL,
    updateLoan as updateL, 
    deleteLoan as deleteL, 

} from "../services/laon";
import {
    getInitLoans as getIloans
} from "../services/loanInit"
import { InitLoan, LoanToCreate } from "../interfaces/loan";

interface LoanContext {
    loans          : any[];
    initLoans      : any[];
    getClientLoans : () => void;
    getInitLoans   : () => void;
    createLoan     : (loanInfo: LoanToCreate, initLoan: InitLoan) => void;
    updateLoan     : (loanInfo: any, loan: number) => void;
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

}

export const LoanContext = createContext(initialValues);

export const LoanProvider = ({children}: React.PropsWithChildren) => {
    const [loans, setLoans] = useState<any[]>([]);
    const [initLoans, setInitLoans] = useState<any[]>([]);

    const getClientLoans = async () => {    
        const loanResponse = await getLoans();
        if(!loanResponse.ok) return;
        setLoans(loanResponse.loans)
    }

    const getInitLoans = async () => {
        const loanResponse = await getIloans();
        if(!loanResponse.ok) return;
        setInitLoans(loanResponse.loans)
    }

    const createLoan = async (loanInfo: LoanToCreate, initLoan: any) => {

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


    return (
        <LoanContext.Provider value={{
            loans,
            initLoans,
            createLoan,
            updateLoan,
            deleteLoan,
            getInitLoans,
            getClientLoans,
        }}>
            {children}
        </LoanContext.Provider>
    )
}
