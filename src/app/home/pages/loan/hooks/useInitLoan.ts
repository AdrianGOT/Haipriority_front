import { useContext } from "react"
import { LoanContext } from "../context/loan"

export const useInitLoan = () =>  {
    const {
        initLoans,
        getInitLoans,
        createInitLoans,
    } = useContext(LoanContext);

    return {
        initLoans,
        getInitLoans,
        createInitLoans,
    }
}