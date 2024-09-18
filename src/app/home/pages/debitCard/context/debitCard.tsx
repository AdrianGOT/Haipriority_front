import { createContext, useState } from "react"
import { 
    getDebitCards, 
    createDebitCard as createDC,
    updateDebitCard as updateDc,
    deleteDebitCard as deleteDC
} from "../services/debitCard";
import {
    getCards
} from "../services/card";
import toast from "react-hot-toast";

interface DCardContext {
    cards               : any[];
    debitCards           : any[];
    getClientDebitCards : () => void;
    updatingDebitCard   : (debitCardInfo: any, cardId: number) => void;
    createDebitCard     : (debitCardInfo: any, cardBase: any) => void;
    deleteDebitCard     : (cardId: number) => void;
    getCardList         : () => void;
}

const initialValues: DCardContext = {
    cards: [],
    debitCards: [],
    getClientDebitCards: function (): void {},
    updatingDebitCard: function (): void {},
    createDebitCard: function (): void {},
    deleteDebitCard: function (): void {},
    getCardList: function (): void {}
}

export const DebitCardContext = createContext(initialValues);

export const DebitCardProvider = ({children}: React.PropsWithChildren) => {
    const [cards, setCards] = useState<any[]>([]);
    const [debitCards, setDebitCard] = useState<any[]>([]);

    const getClientDebitCards = async () => {
        const debitCardResponse = await getDebitCards();
        setDebitCard( debitCardResponse.cards );
    } 

    const createDebitCard = async (debitCardInfo: any, cardBase: any) => {
        
        const debitCardResponse = await createDC(debitCardInfo);
        
        toast.success(debitCardResponse.msg);
        if(!debitCardResponse.ok) return;

        const newDebitCard = {
            ...debitCardResponse.card,
            card: cardBase
        }
        setDebitCard( prevCards => [...prevCards, newDebitCard] )
    }

    const updatingDebitCard = async (debitCardInfo: any, cardId: number) => {
        const debitCardResponse = await updateDc( debitCardInfo, cardId )
        
        toast.success(debitCardResponse.msg);
        if(!debitCardResponse.ok) return;
        
        setDebitCard( prevCard => 
            prevCard.map(card => 
                card.id === cardId? debitCardResponse.card : card ));
    }
    

    const deleteDebitCard = async(cardId: number) => {
        const debitCardResponse = await deleteDC(cardId);
        
        toast.success(debitCardResponse.msg);
        if(!debitCardResponse.ok) return;

        setDebitCard(prevCards => 
            prevCards.filter(card => 
                card.id !== cardId
            )
        )
    }

    const getCardList = async () => {
        const cardResponse = await getCards();
        
        if(!cardResponse.ok) return;

        setCards(cardResponse.cards);

    }



    return (
        <DebitCardContext.Provider value={{
            getClientDebitCards,
            updatingDebitCard,
            createDebitCard,
            deleteDebitCard,
            getCardList,
            debitCards,
            cards,
        }}>
            {children}
        </DebitCardContext.Provider>
    )
}