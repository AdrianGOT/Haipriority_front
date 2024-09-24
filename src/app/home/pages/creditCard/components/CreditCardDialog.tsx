import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useForm } from "react-hook-form";
import { useGeneral } from "../../../../hooks/useGeneral";
import { useEffect } from "react";
import { generateDateToString } from "../../../../helpers/dateHelper";
import { CreditCard } from "../interfaces/creditCard";
import { generateCardName } from "../../../../helpers/transformClientInfo";
import { formValidators } from "../../../../validators/formValidators";

export interface SimpleDialogProps {
    open: boolean;
    card?: CreditCard;
    onClose: (value: any) => void;
  }


export const CreationCardDialog = (props: SimpleDialogProps) => {
    const { onClose, open, card } = props;
    const { client } = useGeneral();
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        setValue,
        watch,
        reset,
    } = useForm();

    useEffect(()=> {
        if(!open) return;
        
        setTimeout(() => {
           
            setValue("cardName", card? card.cardName : generateCardName(client.name));
            setValue("expirationDate", card? generateDateToString(new Date(card.expirationDate)) : generateExpDate());
        
            if(!card) return;
            setValue("cvc", card.cvc);
            setValue("courtDate", card.courtDate);
            setValue("paymentDate", card.paymentDate);
        })
        
    }, [open])
    
    const title = card? "Actualizando Tarjeta de credito" : "Asignación de tarjeta de credito";

    const generateExpDate = () => {
        const currentDate = new Date();
        const expDate = new Date( currentDate.getFullYear() +3,  currentDate.getMonth() + 1, currentDate.getDay() )
        return generateDateToString(expDate);
    }

    const handleClose = () => {
        reset();
        onClose(null);
    }

    
    const sendData = handleSubmit(data => {
        const values = watch();         
        onClose(values); 
        reset();
    }) 

    const validateRangeDate = (value: number): boolean | string => {
        if(value < 1 || value > 31) return "El valor debe estar entre el 1 y 31 de cada mes";
        return true;
    }


    return (
         <Dialog onClose={handleClose} open={open}>
            <DialogTitle textAlign={"center"}>{title}</DialogTitle>
            <DialogContent>
            <form onSubmit={sendData}  className="form-dialog general-form credit-card-areas ">
                        <div className="cardName">
                            <TextField   
                                        {...register("cardName",{
                                            required: formValidators.required
                                           
                                        })}
                                        error={errors["cardName"]? true : false}
                                        label="Nombre en la tarjeta" 
                                        variant="outlined" 
                                        focused
                                        sx={{ width: "100%" }}
                                        size="small"/>
                            { 
                                errors["cardName"] && (
                                    <span className="error-text"> 
                                        { errors["cardName"].message as string } 
                                    </span>
                                ) 
                            }
                            
                        </div>
                        <div className="cvc">
                            <TextField   
                                    {...register("cvc",{
                                        required: formValidators.required,
                                        maxLength: formValidators.maxLength(3),
                                        minLength: formValidators.minLength(3)
                                    })}
                                    error={errors.cvc? true : false}
                                    label="CVC" 
                                    variant="outlined" 
                                    focused
                                    type="number"
                                    sx={{ width: "100%" }}
                                    size="small"/>
                            { 
                                errors["cvc"] && (
                                    <span className="error-text"> 
                                        { errors["cvc"].message as string } 
                                    </span>
                                ) 
                            }
                        
                        </div>
                     
                        <div className="expirationDate">
                            <TextField   
                                        {...register("expirationDate",{
                                            required: formValidators.required
                                        })}
                                        error={errors.expirationDate? true : false}
                                        label="Fecha de expiración" 
                                        variant="outlined" 
                                        focused
                                        sx={{ width: "100%" }}
                                        size="small"/>
                            { 
                                errors["expirationDate"] && (
                                    <span className="error-text"> 
                                        { errors["expirationDate"].message as string } 
                                    </span>
                                ) 
                            }
                            
                        </div>
                        <div className="courtDate">
                            <TextField   
                                        {...register("courtDate",{
                                            required: formValidators.required,
                                            validate : (value: number)=> validateRangeDate(value)
                                        })}
                                        error={errors.courtDate? true : false}
                                        label="Día de corte (día del mes)" 
                                        variant="outlined" 
                                        focused
                                        type="number"
                                        sx={{ width: "100%" }}
                                        size="small"/>
                            { 
                                errors["courtDate"] && (
                                    <span className="error-text"> 
                                        { errors["courtDate"].message as string } 
                                    </span>
                                ) 
                            }
                            
                        </div>
                        <div className="paymentDate">
                            <TextField   
                                        {...register("paymentDate",{
                                            required: formValidators.required,
                                            validate : (value: number)=> validateRangeDate(value)
                                        })}
                                        error={errors.paymentDate? true : false}
                                        label="Fecha de pago (día del mes)" 
                                        variant="outlined" 
                                        focused
                                        type="number"
                                        sx={{ width: "100%" }}
                                        size="small"/>
                            { 
                                errors["paymentDate"] && (
                                    <span className="error-text"> 
                                        { errors["paymentDate"].message as string } 
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