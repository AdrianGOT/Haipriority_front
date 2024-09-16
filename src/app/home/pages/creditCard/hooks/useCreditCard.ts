import { useEffect, useState } from "react"
import { getCards, getCreditCards } from "../services/creditCard"
import { Card } from "../interfaces/card";
import { CreditCard } from "../interfaces/creditCard";

interface ListOfCards{
    cards: Card[];
    creditCards: CreditCard[]
}

export const useCreditCard = ( ) => {
    
    const [loading, setLoading] = useState<boolean>();
    const [cardList, setCardList] = useState<ListOfCards>({creditCards: [], cards: []});

    useEffect(()=> {
        const getCardList = async() => {

            const [ 
                creditCards, 
                cards 
            ] = await Promise.all([getCreditCards(), getCards()])     
            
            setCardList({creditCards:creditCards.cards , cards:cards.cards })
        }

        getCardList();

        
    }, [])

    return {
        cardList
    }
} 