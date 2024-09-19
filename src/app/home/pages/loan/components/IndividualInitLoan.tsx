import { Box, Card, CardActionArea, CardContent, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { getPriceFormatted } from "../../../../helpers/transforCardInfo";
import { useLoan } from "../hooks/useLoan";
import { InitLoan, LoanToCreate } from "../interfaces/loan";
import { LoanDialog } from "./LoanDialog";
import { generateYearLimitInDate } from "../../../../helpers/dateHelper";


interface Prop{
    info: InitLoan
}

const IndividualInitLoan = ({info}: Prop) => {
    const [open, setOpen] = useState<boolean>(false);
    const { createLoan } = useLoan();
    
    const priceFormated = getPriceFormatted(info.amountAllowed);

      const handleClick = ()=>{
        setOpen(!open)
      }

      const handleCloseDialog = async (value: {current_amount: number, limitDate: number}) => {
        if(value) {
            console.log(value);
            
            const loanToCreate: LoanToCreate = {
              loanId: info.id,
              current_amount: value.current_amount,
              limitDate: generateYearLimitInDate(value.limitDate)
            }
            
            await createLoan(loanToCreate, info);
        }

        setOpen(!open);
      }


     
    return (
        <>
        
        <Tooltip title="Seleccione para asignarla">        
            <Card sx={{ width: 330 , height: 110}}>
                <CardActionArea  onClick={handleClick} sx={{height: "100%"}}>
                
                <CardContent >
                    <section className="init-loan__header">
                        <div className="loan-name">
                            {info.title }
                        </div>

                        <div>
                            <strong> Interes: </strong> {info.interest}%
                        </div>

                    </section>

                    <Typography 
                        variant="h6" 
                        sx={{ 
                            color: 'text.secondary', 
                            textAlign: 'center',
                            marginTop: "1rem" }}>
                        <span>Cupo: </span> { priceFormated }
                        
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </Tooltip>

        <LoanDialog onClose={handleCloseDialog} open={open} loan={info}/>
        </>
    )
}

export default function getIndividualInitLoan( data: any ){
    return <IndividualInitLoan info={data} key={`${data.id}${data.type}${data.franchise}`} />
}