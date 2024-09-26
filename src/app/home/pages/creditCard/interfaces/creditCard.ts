import { Card } from "./card";

export interface CreditCard extends CreditCardInit{
    id     : number,
    card   : Card,
    number : string
}

export interface CreditCardInit extends CreatingCard{
    cardId         : number;
}

export interface CreatingCard {
    cvc            : number,
    cardName       : string,
    courtDate      : number,
    paymentDate    : number,
    expirationDate : Date,
    current_amount : number,

}

export type CreatingCardDialog = Omit<CreatingCard, "current_amount">
