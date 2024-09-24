
import { Card } from "../pages/creditCard/interfaces/card"
import { CreditCard } from "../pages/creditCard/interfaces/creditCard"
import { DebitCardComplete } from "../pages/debitCard/interfaces/debitCard"
import { Card as DebitCard } from "../pages/debitCard/interfaces/card";
import { InitLoan } from "../pages/loan/interfaces/initLoans";
import { LoanComplete } from "../pages/loan/interfaces/loan";

type CardListOptions = Card[] | CreditCard[] | DebitCardComplete[] | DebitCard[] | InitLoan[] | LoanComplete[];
export type CardOptions = Card | CreditCard | DebitCardComplete | DebitCard | InitLoan | LoanComplete; 


interface Prop {
    cards: CardListOptions,
    fComponent: (data: CardOptions) => JSX.Element
}

export const CardList:  React.FC<Prop> = ( {cards = [], fComponent }) => {

    return (
        <section className="cardList-wrapper">
            {cards.length > 0 && cards.map(card => fComponent(card) ) }
        </section>
    )
}
