import { Box, Card, CardActionArea, CardContent, Tooltip, Typography } from "@mui/material";
import { Card as CardInit } from "../interfaces/card"
import { VisaIcon } from "../../../components/icons/VisaIcon";
import { MasterCardIcon } from "../../../components/icons/MasterCardIcon";
import { CreationCardDialog } from "../../../components/CreationCardDialog";
import { useState } from "react";

interface Prop{
    info: CardInit
}

const IndividualCard = ({info}: Prop) => {
    const [open, setOpen] = useState<boolean>(false);
    const priceFormated = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(info.amoutallowed)

      const handleClick = ()=>{
        setOpen(!open)
      }

      const handleCloseDialog = () => {
        console.log("se ha cerrado el dialog");
        setOpen(!open);
        
      }

    return (
        <>
        
        <Tooltip title="Seleccione para asignarla">        
            <Card sx={{ maxWidth: 345 }}>
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
        <CreationCardDialog onClose={handleCloseDialog} open={open} card={info}/>
        </>
    )
}

export default function getIndividualCard( data: CardInit ){
    return <IndividualCard info={data} key={`${data.id}${data.type}${data.franchise}`} />
}