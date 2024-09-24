import { Franchise } from '../../../interfaces/cards';


export interface Card {
    amountAllowed : number;
    franchise     : Franchise;
    type          : string;
    id            : number;
}
export type CreatCard = Omit<Card, "id">
