
import { Card } from "../pages/creditCard/interfaces/card"
import { CreditCard } from "../pages/creditCard/interfaces/creditCard"

interface Prop {
    cards: Card[] | CreditCard[],
    fComponent: (data: any) => JSX.Element
}

export const CardList:  React.FC<Prop> = ( {cards = [], fComponent }) => {

    return (
        <section className="cardList-wrapper">
            {cards.length > 0 && cards.map(card => fComponent(card) ) }
        </section>
    )
}
