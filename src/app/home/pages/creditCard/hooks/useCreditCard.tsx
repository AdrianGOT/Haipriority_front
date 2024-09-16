import { useContext } from "react";
import { CreditCardContext } from "../../../../../context/creditCard";

export const useCreditCard = ( ) => {

    const {
        creditCards,
        createCreditCard,
        getClientCredictCards,
    } = useContext(CreditCardContext);
 
    return{
        creditCards,
        createCreditCard,
        getClientCredictCards,
    }

} 