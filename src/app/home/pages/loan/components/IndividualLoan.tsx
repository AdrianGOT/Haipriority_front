import { useState } from "react"

import { IconButton, Menu, MenuItem } from "@mui/material"
import { generateDateToString, generateYearLimitInDate } from "../../../../helpers/dateHelper"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LoanDialog } from "./LoanDialog"
import { getPriceFormatted } from "../../../../helpers/transforCardInfo"
import { useLoan } from "../hooks/useLoan"
import { LoanComplete, LoanToCreate } from "../interfaces/loan";
import { useGeneral } from "../../../../hooks/useGeneral";
import { ROLES } from "../../client/interfaces/client.interfaces";
import { CardOptions } from "../../../components/CardList";

interface Prop{
    info: LoanComplete
}


const IndividualLoan = ({info}: Prop) => {
    
    const { deleteLoan, updateLoan } = useLoan();
    const { client } = useGeneral();

    const [ anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [ openEditDialog, setOpenEditDialog ] = useState(false);
    
    const dateFormated = generateDateToString(new Date(info.limitDate));
    const amountAllowedFormated = getPriceFormatted(info.loan_init.amountAllowed);
    const currentAmountFormated = getPriceFormatted(info.current_amount);
    const isAdmin = client.roles.some(role => role === ROLES.admin);

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(ev.currentTarget);
    }

    const HandledeleteCard = async () => {
        handleClose();
        await deleteLoan(info.id);
    }

    const handleEditCard = () => {
        setOpenEditDialog(true)
    }

    const handleCloseEditDialog = async (data: {current_amount: number, limitDate: number}) => {
        setOpenEditDialog(false);
        handleClose();
        
        if(!data) return; 
                
        const cardToUpdate: LoanToCreate = {
            current_amount: data.current_amount,
            limitDate: generateYearLimitInDate(data.limitDate),
            loanId: info.id
        }
        
        await updateLoan(cardToUpdate, info.id);
    }

    return (

        <>
            <div className="loan-container">
                <div className="loan-container__header">
                    <div className="first-line">
                        <strong>{info.loan_init.title} </strong> <span>{ isAdmin &&  info.client.name}</span>
                    </div>
                    <IconButton 
                        id="menu-button"
                        aria-controls={open ? 'loan-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        aria-label="menu" 
                        size="small">
                    <MoreVertIcon fontSize="inherit" />
                    </IconButton>

                    <Menu
                        id="loan-menu"
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

                <div className="loan-container__content">
                    <div >
                        <div>
                            <span>Total: </span> <strong>{amountAllowedFormated}</strong>
                        </div>
                        <div>
                            <span>Abonados: </span> <strong>{currentAmountFormated}</strong>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>Fecha limite:</span>
                            <strong> {dateFormated} </strong>
                        </div>
                        <div>
                            <span>Interes:</span>
                            <strong> {info.loan_init.interest} % </strong>
                        </div>
                    </div>
                </div>

            </div>

            <LoanDialog open={openEditDialog} loan={info} onClose={handleCloseEditDialog}/>
        </>
    )
}

export default function getIndividualLoan(data: Partial<CardOptions>){
    const newLoan = data as LoanComplete;
    return <IndividualLoan info={newLoan} key={`${newLoan.id}${newLoan.createdAt}`}/>
}