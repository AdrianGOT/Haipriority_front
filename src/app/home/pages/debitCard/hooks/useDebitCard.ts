import { useContext } from "react";
import { DebitCardContext } from "../context/debitCard";

export const useDebitCard = ( ) => {

    const {
        debitCards,
        deleteDebitCard,
        createDebitCard,
        updatingDebitCard,
        getClientDebitCards,
    } = useContext(DebitCardContext);
 
    return{
        debitCards,
        deleteDebitCard,
        createDebitCard,
        updatingDebitCard,
        getClientDebitCards,
    }
} 