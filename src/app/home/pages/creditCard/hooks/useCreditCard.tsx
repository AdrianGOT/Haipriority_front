import { useContext } from "react";
import { CreditCardContext } from "../../../../../context/creditCard";

export const useCreditCard = ( ) => {

    const {
        deleteCC,
        creditCards,
        createCreditCard,
        getClientCredictCards,
    } = useContext(CreditCardContext);
 
    return{
        deleteCC,
        creditCards,
        createCreditCard,
        getClientCredictCards,
    }
} 