import { createContext, useState } from "react";
import { Card } from "../app/home/pages/creditCard/interfaces/card";
import { CreatingCard, CreditCard, CreditCardInit } from "../app/home/pages/creditCard/interfaces/creditCard";
import { createCC, deleteCreditCard, getCreditCards, updateCreditCard } from "../app/home/pages/creditCard/services/creditCard";
import toast from "react-hot-toast";
import { getCards } from "../app/home/pages/creditCard/services/card";

interface CardsContext {
  cards                  : Card[],
  creditCards            : CreditCard[],
  getCardList            : () => void
  createCreditCard       : (cCardInfo: CreditCardInit, cardBase: Card) => void
  getClientCredictCards  : () => void,
  deleteCC               : (cardId: number) => void;
  updatingCreditCard     : (data: CreatingCard, cardId: number) => void;
}

const initialValues: CardsContext = {
    getClientCredictCards : () => {},
    createCreditCard      : () => {},
    getCardList           : () => {},
    updatingCreditCard    : () => {},
    deleteCC              : () => {},
    cards                 : [],
    creditCards           : [],

}

export const CreditCardContext = createContext<CardsContext>(initialValues)

export function CreditcardsProvider({children}: React.PropsWithChildren){

    const [ cards, setCards] = useState<Card[]>([]);
    const [ creditCards, setCreditCards] = useState<CreditCard[]>([]);
    
    const createNewCreditCard = async (cardInfo: CreditCardInit, cardBase: Card) => {
        const creditCard = await createCC(cardInfo);
        const newCreditCard: CreditCard = {
            ...creditCard.card, 
            card: cardBase
        }
        
        setCreditCards(prevCards => [...prevCards, newCreditCard] );
    }

    const createCreditCard = async(creditCardToCreate: CreditCardInit, cardBase: Card) => {
        toast.promise(
            createNewCreditCard(creditCardToCreate, cardBase),
            {
               loading: 'Asignando la nueva tarjeta de credito ...',
               success: "Tarjeta creada!",
               error: "No se pudo crear la tarjeta",
            } 
        );
    }

    const getClientCredictCards = async() =>{
        const creditCards = await getCreditCards();
        setCreditCards(creditCards.cards);
    } 

    const deleteCC = async(cardId: number) => {
        const cardDeleted = await deleteCreditCard(cardId);
        if(cardDeleted.ok) {
            toast.success(cardDeleted.msg);
            setCreditCards(prevCards => prevCards.filter( card => card.id !== cardId ));
        }
    }

    const updatingCreditCard = async (data: CreatingCard, cardId: number) => {
        const creditCardUpdated = await updateCreditCard( data, cardId );

        if(!creditCardUpdated.ok) return;

        toast.success(creditCardUpdated.msg);

        setCreditCards( prevCCards => 
            prevCCards.map(card => 
                card.id === cardId? creditCardUpdated.card : card
            ) 
        )

    }
    



    const getCardList = async() => {
        const cards = await getCards();
        setCards( cards.cards );
    }

    return (
        <CreditCardContext.Provider value={{
            cards,
            creditCards,
            createCreditCard,
            getClientCredictCards,
            updatingCreditCard,
            getCardList,
            deleteCC
        }}>
            { children }
        </CreditCardContext.Provider>
    )
}