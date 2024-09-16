import { Box, Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { CreditCard } from "../interfaces/creditCard"
import { VisaIcon } from "../../../components/icons/VisaIcon"
import { MasterCardIcon } from "../../../components/icons/MasterCardIcon"
import { generateDateToString } from "../../../../helpers/dateHelper"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react"

interface Prop{
    info: CreditCard
}


const IndividualCreditCard = ({info}: Prop) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const getAnSpace = ( index : number) => (index !== 0 && index % 4 === 0)? " " : "";  
    const getPriceFormatted = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)
    } 
    const franchiseIcon = info.card.franchise === "VISA"? <VisaIcon/>: <MasterCardIcon/>
    const numberFormated = info.number
        .split("")
        .reduce((preV, currV, index) => `${preV}${currV}${getAnSpace(index)}`,"")
    const dateFormated = generateDateToString(new Date(info.expirationDate));
    const priceAllowedFormated = getPriceFormatted(info.card.amoutallowed);
    const currentAmountFormated = getPriceFormatted(info.current_amount);

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(ev.currentTarget);
    }

    return (

        <div className="card-container">
            <div className="card-container__header">
                <div className="first-line">
                    <strong>{numberFormated}</strong> 
                    <div className="card-type">
                        {franchiseIcon}
                        <p>{info.card.type}</p>
                    </div>
                </div>
                <IconButton onClick={handleClick} aria-label="menu" size="small">
                  <MoreVertIcon fontSize="inherit" />
                </IconButton>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Editar</MenuItem>
                    <MenuItem onClick={handleClose}>Eliminar</MenuItem>
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
    )
}

export default function getIndividualCreditCard(data: CreditCard){
    return <IndividualCreditCard info={data} key={`${data.id}`}/>
}