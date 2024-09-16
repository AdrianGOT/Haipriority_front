import { useState } from "react"
import { Card } from "../interfaces/card"
import { getCards } from "../services/card"

export const useCards = () => {
    const [cards, setCards] = useState<Card[]>([])
    
    const getCardList = async() => {
        const cards = await getCards();
        setCards( cards.cards );
    }

    return {
        cards,
        getCardList,
    }
}
