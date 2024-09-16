import { useContext } from "react";
import { CreditCardContext } from "../../../../../context/creditCard";

export const useCards = () => {
    const { 
        cards, 
        getCardList 
    } = useContext(CreditCardContext);


    return {
        cards,
        getCardList,
    }
}
