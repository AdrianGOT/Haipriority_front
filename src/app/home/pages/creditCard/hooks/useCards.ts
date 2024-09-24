import { useContext } from "react";
import { CreditCardContext } from "../context/creditCard";

export const useCards = () => {
    const { 
        cards, 
        getCardList,
        createCard
    } = useContext(CreditCardContext);


    return {
        cards,
        createCard,
        getCardList,
    }
}
