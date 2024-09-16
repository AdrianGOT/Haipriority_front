export interface Card{
    amoutallowed: number;
    franchise:    ​​​Franchise;
    ​​​type:         string;
    id:           number;
}

export enum Franchise {
    masterCard = "MASTER CARD",
    visa = "VISA"
}