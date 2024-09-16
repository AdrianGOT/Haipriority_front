import { createContext, useState } from "react";
import { Card } from "../app/home/pages/creditCard/interfaces/card";
import { CreditCard, CreditCardInit } from "../app/home/pages/creditCard/interfaces/creditCard";
import { createCC, getCreditCards } from "../app/home/pages/creditCard/services/creditCard";
import toast from "react-hot-toast";

interface CardsContext {
  cards       : Card[],
  creditCards : CreditCard[],
  createCreditCard: (cCardInfo: CreditCardInit) => void
  getClientCredictCards: () => void
}

const initialValues: CardsContext = {
    cards: [],
    creditCards: [],
    createCreditCard: (cCardInfo: CreditCardInit) => {},
    getClientCredictCards: () => {},

}



export const CreditCardContext = createContext<CardsContext>(initialValues)

export function CreditcardsProvider({children}: React.PropsWithChildren){
    const [ cards, setCards] = useState<Card[]>([]);
    const [ creditCards, setCreditCards] = useState<CreditCard[]>([]);
    
    console.log(creditCards);
    

    const createNewCreditCard = async (cardInfo: CreditCardInit) => {
        const creditCard = await createCC(cardInfo);    
        setCreditCards([...creditCards, creditCard.card]);
    }

    const createCreditCard = async(creditCardToCreate: CreditCardInit) => {
        toast.promise(
            createNewCreditCard(creditCardToCreate),
            {
               loading: 'Asignando la nueva tarjeta de credito ...',
               success: "Tarjeta creada!",
               error: "No se pudo crear la tarjeta",
            } 
        );
    }

    const getClientCredictCards = async() =>{
        console.log("lalo");
        
        const creditCards = await getCreditCards();
        console.log(" creditCards ===> ",creditCards);
        
        setCreditCards(creditCards.cards);
    } 

    return (
        <CreditCardContext.Provider value={{
            cards,
            creditCards,
            createCreditCard,
            getClientCredictCards
        }}>
            { children }
        </CreditCardContext.Provider>
    )
}