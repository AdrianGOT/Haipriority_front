import { Box, Card, CardActionArea, CardContent, Tooltip, Typography } from "@mui/material";
import { Card as CardInit } from "../interfaces/card"
import { VisaIcon } from "../../../components/icons/VisaIcon";
import { MasterCardIcon } from "../../../components/icons/MasterCardIcon";
import { CreationCardDialog } from "./DebitCardDialog";
import { useState } from "react";
import { DebitCard } from "../interfaces/debitCard";
import { useDebitCard } from "../hooks/useDebitCard";
import { CardOptions } from "../../../components/CardList";


interface Prop{
    info: CardInit
}

const IndividualCard = ({info}: Prop) => {
    const [open, setOpen] = useState<boolean>(false);
    const { createDebitCard } = useDebitCard();

    const handleClick = ()=>{
        setOpen(!open)
    }

    const handleCloseDialog = async (value: DebitCard) => {
        if(value) {
            
            const creditCardToCreate: DebitCard = {
                cvc: Number(value.cvc),
                cardName: value.cardName,
                current_amount: 0,
                expirationDate: value.expirationDate,
                cardId: info.id,
            }
            
            await createDebitCard(creditCardToCreate, info);
        }

        setOpen(!open);
    }

    return (
        <>
        <Tooltip title="Seleccione para asignarla">        
            <Card sx={{ width: 330 , height: 76}}>
                <CardActionArea  onClick={handleClick}>
                
                <CardContent >
                    <Box sx={{ display: "flex", justifyContent: "space-around"}}>
                        <Typography gutterBottom variant="h6" component="div">
                            {info.type }
                        </Typography>

                        {info.franchise === "VISA"? <VisaIcon/>: <MasterCardIcon/>  }

                    </Box>
                </CardContent>
                </CardActionArea>
            </Card>
        </Tooltip>

        <CreationCardDialog onClose={handleCloseDialog} open={open}/>
        </>
    )
}

export default function getIndividualCard( data: CardOptions ){
    const newData = data as CardInit;
    return <IndividualCard info={newData} key={`${newData.id}${newData.type}${newData.franchise}`} />
}