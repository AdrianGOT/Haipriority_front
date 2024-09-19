import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getPriceFormatted } from "../../../../helpers/transforCardInfo";

export interface SimpleDialogProps {
    open: boolean;
    loan?: any;
    onClose: (value: any) => void;
  }


export const LoanDialog = (props: SimpleDialogProps) => {
    const { onClose, open, loan } = props;
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        setValue,
        watch,
        reset,
    } = useForm();
    
    const isLoanInit = !!loan.title;
    console.log(isLoanInit);
    

    useEffect(()=> {
        if(!open) return;
        
        setTimeout(() => {
        
            setValue("limitDate", 
                isLoanInit? 20 : transformDateInYears(new Date(loan.limitDate)) 
            );

            setValue("current_amount", 
                isLoanInit?  0 :loan.current_amount
            )
        })
        
    }, [open])


    const loanName = isLoanInit?  loan.title: loan.loan_init.title ;
    const amountAllowed = isLoanInit? loan.amountAllowed : loan.loan_init.amountAllowed;
    const currentAmountFormatted = getPriceFormatted(amountAllowed);
   
    const title = isLoanInit? "Actualización del prestamo" : "Adquisión de prestamo";

    const handleClose = () => {
        reset();
        onClose(null);
    }
    
    const sendData = handleSubmit(_ => {
        const values = watch();         
        onClose(values); 
        reset();
    }) 

    const validateYearsAllowed = (value: number) : boolean | string => {
        if(value < 20 || value > 30) return "La cantidad de años debe estar entre 20 y 30";
        return true;
    }

    const validateAmount = (value: number): boolean | string => {
        if(value < 0) return "No es permitido valores negativos";
        return true;
    }

    const transformDateInYears = (date: Date) => {
        return date.getFullYear() - new Date().getFullYear();
    }

    return (
         <Dialog onClose={handleClose} open={open}>
            <DialogTitle textAlign={"center"}>{title}</DialogTitle>
            <DialogContent>
                <div>
                    <p> Nombre del prestamo: <strong>{loanName}</strong></p> 
                    <p>Cupo: {currentAmountFormatted}</p>
                </div>
                <form onSubmit={sendData}  className="form-dialog general-form">
                    <div className="limitDate">
                        <TextField   
                                    {...register("limitDate",{
                                        required: { 
                                            value: true, 
                                            message: "Este valor es requerido"
                                        },
                                        validate: (value) => validateYearsAllowed(value)
                                    })}
                                    type="number"
                                    error={errors.expirationDate? true : false}
                                    label="Cantidad de años"
                                    variant="outlined" 
                                    focused
                                    sx={{ width: "100%" }}
                                    size="small"/>
                        { 
                            errors["limitDate"] && (
                                <span className="error-text"> 
                                    { errors["limitDate"].message as string } 
                                </span>
                            ) 
                        }
                        
                    </div>
                    <div className="current_amount">
                        <TextField   
                                    {...register("current_amount",{
                                        required: { 
                                            value: true, 
                                            message: "Este valor es requerido"
                                        },
                                        validate: (value) => validateAmount(value)
                                    })}
                                    type="number"
                                    error={errors.expirationDate? true : false}
                                    label="Valor abonado"
                                    variant="outlined" 
                                    focused
                                    sx={{ width: "100%" }}
                                    size="small"/>
                        { 
                            errors["current_amount"] && (
                                <span className="error-text"> 
                                    { errors["current_amount"].message as string } 
                                </span>
                            ) 
                        }
                        
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={sendData}>Guardar</Button>
            </DialogActions>
        </Dialog>
    )
}