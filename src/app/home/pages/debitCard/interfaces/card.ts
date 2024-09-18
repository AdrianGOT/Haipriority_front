import { Franchise } from "../../../interfaces/cards";


export interface Card{
    id: number;
    type: string;
    franchise: Franchise;
}