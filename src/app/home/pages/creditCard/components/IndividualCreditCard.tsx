import { CreditCard } from "../interfaces/creditCard"

interface Prop{
    info: CreditCard
}


const IndividualCreditCard = ({info}: Prop) => {
    return (
        <h2>IndividualCreditCard</h2>
    )
}

export default function getIndividualCreditCard(data: CreditCard){
    return <IndividualCreditCard info={data} key={`${data.id}`}/>
}