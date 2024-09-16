export interface CreditCard extends CreditCardInit{
    id : number
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

}
