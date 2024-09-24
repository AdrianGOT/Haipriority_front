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
import { Card } from "../interfaces/card";
import { DebitCard, DebitCardComplete } from "../interfaces/debitCard";
import { useGeneral } from "../../../../hooks/useGeneral";
import { decodeCardData, decodeOneCard } from "../../../../helpers/encryptData";

interface DCardContext {
    cards               : Card[];
    debitCards          : DebitCardComplete[];
    getClientDebitCards : () => void;
    updatingDebitCard   : (debitCardInfo: DebitCard, cardId: number) => void;
    createDebitCard     : (debitCardInfo: DebitCard, cardBase: Card) => void;
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
    const [cards, setCards] = useState<Card[]>([]);
    const [debitCards, setDebitCard] = useState<DebitCardComplete[]>([]);
    const { secretKey , iv} = useGeneral();


    const getClientDebitCards = async () => {
        const debitCardResponse = await getDebitCards();
        
        if(!debitCardResponse.ok) return;
        
        const _cards = debitCardResponse.cards as DebitCardComplete[];        
        const newCardList = await decodeCardData(_cards, secretKey, iv);
        setDebitCard( newCardList as DebitCardComplete[] );
    } 

    const createDebitCard = async (debitCardInfo: DebitCard, cardBase: Card) => {
        
        const debitCardResponse = await createDC(debitCardInfo);
        
        toast.success(debitCardResponse.msg);
        if(!debitCardResponse.ok) return;

        console.log("debitCardResponse ==> ",debitCardResponse.card);
        
        const cardDecoded = decodeOneCard<DebitCardComplete>(debitCardResponse.card, secretKey, iv);
        console.log(cardDecoded);
        
        const newDebitCard = {
            ...cardDecoded,
            card: cardBase
        }
        setDebitCard( prevCards => [...prevCards, newDebitCard] )
    }

    const updatingDebitCard = async (debitCardInfo: DebitCard, cardId: number) => {
        const debitCardResponse = await updateDc( debitCardInfo, cardId )
        
        toast.success(debitCardResponse.msg);
        if(!debitCardResponse.ok) return;

        const cardDecoded = decodeOneCard<DebitCardComplete>(debitCardResponse.card, secretKey, iv);

        setDebitCard( prevCard => 
            prevCard.map(card => 
                card.id === cardId? cardDecoded : card ));
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