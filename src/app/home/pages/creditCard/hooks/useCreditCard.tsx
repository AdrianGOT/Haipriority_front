import { useContext, useEffect, useState } from "react";
import { createCC, getCreditCards } from "../services/creditCard";
import { CreditCard, CreditCardInit } from "../interfaces/creditCard";
import toast from "react-hot-toast";
import { CreditCardContext } from "../../../../../context/creditCard";

export const useCreditCard = ( ) => {
    
    // const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
    // console.log();
    
    // const getClientCredictCards = async() =>{
    //     const creditCards = await getCreditCards();
    //     setCreditCards(creditCards.cards);
    // } 

    // const createNewCreditCard = async (cardInfo: CreditCardInit) => {
    //     const creditCard = await createCC(cardInfo);
    //     setCreditCards( preCCards => [...preCCards, creditCard.card]);
    // }

    // const createCreditCard = async(creditCardToCreate: CreditCardInit) => {
    //     toast.promise(
    //         createNewCreditCard(creditCardToCreate),
    //         {
    //            loading: 'Asignando la nueva tarjeta de credito ...',
    //            success: "Tarjeta creada!",
    //            error: "No se pudo crear la tarjeta",
    //         } 
    //     );
    // }
    

    // return {
    //     creditCards,
    //     createCreditCard,
    //     getClientCredictCards
    // }

    const {
        creditCards,
        createCreditCard,
        getClientCredictCards,
    } = useContext(CreditCardContext);
 
    return{
        creditCards,
        createCreditCard,
        getClientCredictCards,
    }

} 