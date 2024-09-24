import { IconButton, Menu, MenuItem } from "@mui/material"
import { VisaIcon } from "../../../components/icons/VisaIcon"
import { MasterCardIcon } from "../../../components/icons/MasterCardIcon"
import { generateDateToString } from "../../../../helpers/dateHelper"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react"
import { CreationCardDialog } from "./DebitCardDialog"
import { useDebitCard } from "../hooks/useDebitCard";
import { getPriceFormatted } from "../../../../helpers/transforCardInfo";
import { DebitCard, DebitCardComplete } from "../interfaces/debitCard";


interface Prop{
    info: DebitCardComplete
}


const IndividualDebitCard = ({info}: Prop) => {
    const { deleteDebitCard, updatingDebitCard } = useDebitCard();
    const [ openEditDialog, setOpenEditDialog ] = useState(false);
    const [ anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const getAnSpace = ( index : number) => (index !== 0 && [3,7,11].some(n =>index === n ) )? " " : "";  
    const numberFormated = info.number.split("").reduce((preV, currV, index) => `${preV}${currV}${getAnSpace(index)}`,"")
    const franchiseIcon = info?.card.franchise === "VISA"? <VisaIcon/>: <MasterCardIcon/>
    const dateFormated = generateDateToString(new Date(info.expirationDate));
    const currentAmount = getPriceFormatted(info.current_amount);


    const handleCloseMenu = () => {
        setAnchorEl(null);
    }
    const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(ev.currentTarget);
    }

    const HandledeleteCard = async () => {
        handleCloseMenu();
        await deleteDebitCard(info.id);
    }

    const handleCloseDialog = async (data: DebitCard) => {
        setOpenEditDialog(false);
        handleCloseMenu();
        
        if(!data) return; 
                
        const cardToUpdate: DebitCard = {
            cvc: Number(data.cvc),
            cardName: data.cardName,
            expirationDate: data.expirationDate,
            current_amount: 0
        }
        
        updatingDebitCard(cardToUpdate, info.id);
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
                        onClose={handleCloseMenu}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => setOpenEditDialog(true)}>Editar</MenuItem>
                        <MenuItem onClick={HandledeleteCard}>Eliminar</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Usar</MenuItem>
                    </Menu>
                </div>

                <div className="card-container__content">
                    <div >
                        <div>
                            <span>Saldo: </span> <strong>{currentAmount}</strong>
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

            <CreationCardDialog open={openEditDialog} card={info} onClose={handleCloseDialog}/>
        </>
    )
}

export default function getIndividualDebitCard(data: DebitCardComplete){
    return <IndividualDebitCard info={data} key={`${data.id}${data.number}${data.clientId}`}/>
}