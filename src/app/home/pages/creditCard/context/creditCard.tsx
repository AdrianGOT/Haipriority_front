import { createContext, useState } from "react";
import { Card } from "../interfaces/card";
import { CreatingCard, CreditCard, CreditCardInit } from "../interfaces/creditCard";
import { 
    getCreditCards, 
    deleteCreditCard,
    updateCreditCard,
    createCreditCard as createCC, 
} from "../services/creditCard";
import toast from "react-hot-toast";
import { getCards } from "../services/card";
import { useGeneral } from "../../../../hooks/useGeneral";
import { decodeCardData, decodeOneCard } from "../../../../helpers/encryptData";



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
    const { secretKey , iv} = useGeneral();
    
    const createNewCreditCard = async (cardInfo: CreditCardInit, cardBase: Card) => {
    
        const creditCard = await createCC(cardInfo);

        const cardDecoded = decodeOneCard<CreditCard>(creditCard.card, secretKey, iv);

        const newCreditCard: CreditCard = {
            ...cardDecoded, 
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
        const creditCardResponse = await getCreditCards();
        
        if(!creditCardResponse.ok) return;
        
        const _cards = creditCardResponse.cards as CreditCard[];        
        const newCardList = await decodeCardData(_cards, secretKey, iv);
        
        setCreditCards( newCardList as CreditCard[] );
    }


    const deleteCC = async(cardId: number) => {
        const cardDeleted = await deleteCreditCard(cardId);
        if(cardDeleted.ok) {
            
            toast.success(cardDeleted.msg);

            setCreditCards(prevCards => 
                prevCards.filter( card => 
                    card.id !== cardId 
                )
            );
        }
    }

    const updatingCreditCard = async (data: CreatingCard, cardId: number) => {
        const creditCardUpdated = await updateCreditCard( data, cardId );

        if(!creditCardUpdated.ok) return;

        toast.success(creditCardUpdated.msg);

        const cardDecoded = decodeOneCard<CreditCard>(creditCardUpdated.card, secretKey, iv);
        
        setCreditCards( prevCCards => 
            prevCCards.map(card => 
                card.id === cardId? cardDecoded : card
            ) 
        )

    }
    
    // ======================== 

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