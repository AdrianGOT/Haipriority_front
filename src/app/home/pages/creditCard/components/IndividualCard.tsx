import { Box, Card, CardActionArea, CardContent, Tooltip, Typography } from "@mui/material";
import { Card as CardInit } from "../interfaces/card"
import { VisaIcon } from "../../../components/icons/VisaIcon";
import { MasterCardIcon } from "../../../components/icons/MasterCardIcon";
import { CreationCardDialog } from "./CreditCardDialog";
import { useState } from "react";
import { CreatingCardDialog, CreditCardInit } from "../interfaces/creditCard";
import { useCreditCard } from "../hooks/useCreditCard";
import { getPriceFormatted } from "../../../../helpers/transforCardInfo";
import { CardOptions } from "../../../components/CardList";


interface Prop{
    info: CardInit
}

const IndividualCard = ({info}: Prop) => {
    const [open, setOpen] = useState<boolean>(false);

    const { createCreditCard } = useCreditCard();

    const priceFormated = getPriceFormatted(info.amountAllowed);

    const handleClick = ()=>{

    setOpen(!open)
    }

    const handleCloseDialog = async (value:CreatingCardDialog | null) => {
    if(value) {
        
        const creditCardToCreate: CreditCardInit = {
            cardId: info.id,
            cvc: Number(value.cvc),
            cardName: value.cardName,
            courtDate: Number(value.courtDate),
            paymentDate: Number(value.paymentDate),
            expirationDate: value.expirationDate,
            current_amount: 0

        }
        
        await createCreditCard(creditCardToCreate, info);
    }

    setOpen(!open);
    }
     
    return (
        <>
        
        <Tooltip title="Seleccione para asignarla">        
            <Card sx={{ width: 330 , height: 110}}>
                <CardActionArea  onClick={handleClick}>
                
                <CardContent >
                    <Box sx={{ display: "flex", justifyContent: "space-around"}}>
                        <Typography gutterBottom variant="h6" component="div">
                            {info.type }
                        </Typography>

                        {info.franchise === "VISA"? <VisaIcon/>: <MasterCardIcon/>  }

                    </Box>

                    <Typography variant="h6" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                        <span>Cupo: </span> { priceFormated }
                        
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </Tooltip>


        <CreationCardDialog onClose={handleCloseDialog} open={open}/>
        </>
    )
}

export default function getIndividualCard( data: CardOptions ){
    const newCard = data as CardInit;
    return <IndividualCard info={newCard} key={`${newCard.id}${newCard.type}${newCard.franchise}`} />
}