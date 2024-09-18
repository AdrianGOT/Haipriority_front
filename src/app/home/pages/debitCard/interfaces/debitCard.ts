import { Card } from "./card";

export interface DebitCardComplete extends DebitCard {
    id: number
    number: string
    createdAt: Date
    clientId: number,
    card: Card
}

export interface DebitCard {
    cardId?: number, 
    cvc: number;
    cardName: string;
    current_amount: number;
    expirationDate: Date;
}