import { useContext } from "react";
import { DebitCardContext } from "../context/debitCard";

export const useCards = () => {
    const { 
        cards, 
        getCardList
    } = useContext(DebitCardContext);


    return {
        cards,
        getCardList,
    }
}
