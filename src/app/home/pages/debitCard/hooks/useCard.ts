import { useContext } from "react";
import { DebitCardContext } from "../context/debitCard";

export const useCards = () => {
    const { 
        cards, 
        createCard,
        getCardList,
    } = useContext(DebitCardContext);


    return {
        cards,
        createCard,
        getCardList,
    }
}
