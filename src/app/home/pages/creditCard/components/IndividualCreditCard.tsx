import { Box, Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { CreatingCard, CreditCard } from "../interfaces/creditCard"
import { VisaIcon } from "../../../components/icons/VisaIcon"
import { MasterCardIcon } from "../../../components/icons/MasterCardIcon"
import { generateDateToString } from "../../../../helpers/dateHelper"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react"
import { useCreditCard } from "../hooks/useCreditCard"
import { CreationCardDialog } from "./CreditCardDialog"
import { getPriceFormatted } from "../../../../helpers/transforCardInfo"

interface Prop{
    info: CreditCard
}


const IndividualCreditCard = ({info}: Prop) => {

    const { deleteCC, updatingCreditCard } = useCreditCard();
    const [ anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [ openEditDialog, setOpenEditDialog ] = useState(false);
    
    const getAnSpace = ( index : number) => (index !== 0 && index % 4 === 0)? " " : "";  
    const franchiseIcon = info?.card.franchise === "VISA"? <VisaIcon/>: <MasterCardIcon/>
    const numberFormated = info.number.split("").reduce((preV, currV, index) => `${preV}${currV}${getAnSpace(index)}`,"")
    const dateFormated = generateDateToString(new Date(info.expirationDate));
    const priceAllowedFormated = getPriceFormatted(info.card.amountAllowed);
    const currentAmountFormated = getPriceFormatted(info.current_amount);

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(ev.currentTarget);
    }

    const HandledeleteCard = async () => {
        handleClose();
        await deleteCC(info.id);
    }

    const handleEditCard = () => {
        setOpenEditDialog(true)
    }

    const handleCloseEditDialog = async (data: CreatingCard) => {
        setOpenEditDialog(false);
        handleClose();
        
        if(!data) return; 
                
        const cardToUpdate: CreatingCard = {
            cvc: Number(data.cvc),
            courtDate: Number(data.courtDate),
            paymentDate: Number(data.paymentDate),
            cardName: data.cardName,
            expirationDate: data.expirationDate,
            current_amount: 0
        }
        
        await updatingCreditCard(cardToUpdate, info.id);
    }

    return (

        <>
            <div className="card-container">
                <div className="card-container__header">
                    <div className="first-line">
                        <div>
                            <strong>{numberFormated}</strong>
                            <p>{info.cardName}</p> 
                        </div>
                        <div className="card-type">
                            {franchiseIcon}
                            <p>{info.card.type}</p>
                        </div>
                    </div>
                    <IconButton 
                        id="menu-button"
                        aria-controls={open ? 'credit-card-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        aria-label="menu" 
                        size="small">
                    <MoreVertIcon fontSize="inherit" />
                    </IconButton>

                    <Menu
                        id="credit-card-menu"
                        aria-labelledby="menu-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleEditCard}>Editar</MenuItem>
                        <MenuItem onClick={HandledeleteCard}>Eliminar</MenuItem>
                        <MenuItem onClick={handleClose}>Usar</MenuItem>
                    </Menu>
                </div>

                <div className="card-container__content">
                    <div >
                        <div>
                            <span>Cupo: </span> <strong>{priceAllowedFormated}</strong>
                        </div>
                        <div>
                            <span>Gastos: </span>   <strong>{currentAmountFormated}</strong>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>Exp:</span>
                            <strong> {dateFormated} </strong>
                        </div>
                        <div>
                            <span>CVC:</span>
                            <strong> {info.cvc} </strong>
                        </div>
                    </div>
                </div>

            </div>

            <CreationCardDialog open={openEditDialog} card={info} onClose={handleCloseEditDialog}/>
        </>
    )
}

export default function getIndividualCreditCard(data: CreditCard){
    return <IndividualCreditCard info={data} key={`${data.id}`}/>
}