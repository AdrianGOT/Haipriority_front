import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useForm } from "react-hook-form";
import { useClient } from "../../../../hooks/useClient";
import { useEffect } from "react";
import { generateDateToString } from "../../../../helpers/dateHelper";
import { CreditCard } from "../interfaces/creditCard";

export interface SimpleDialogProps {
    open: boolean;
    card?: CreditCard;
    onClose: (value: any) => void;
  }


export const CreationCardDialog = (props: SimpleDialogProps) => {
    const { onClose, open, card } = props;
    const { client } = useClient();
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
           
            setValue("cardName", card? card.cardName : generateCardName());
            setValue("expirationDate", card? generateDateToString(new Date(card.expirationDate)) : generateExpDate());
        
            if(!card) return;
            setValue("cvc", card.cvc);
            setValue("courtDate", card.courtDate);
            setValue("paymentDate", card.paymentDate);



        })
        
    }, [open])
    
    const title = card? "Actualizando Tarjeta de credito" : "Asignación de tarjeta de credito";

    const generateCardName = () => {
        const firstLetter =  client.name.charAt(0);
        const restOfName = client.name.slice(1,client.name.length);
        return `${firstLetter.toUpperCase()}${restOfName}`;
    }

    const generateExpDate = () => {
        const currentDate = new Date();
        const expDate = new Date( currentDate.getFullYear() +3,  currentDate.getMonth() + 1, currentDate.getDay() )
        return generateDateToString(expDate);
    }

    const handleClose = () => {
        reset();
        onClose(null);
    }

    
    const sendData = handleSubmit(_ => {
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
            <form onSubmit={sendData}  className="form-create form">
                        <div className="cardName">
                            <TextField   
                                        {...register("cardName",{
                                            required: {
                                                value: true, 
                                                message: "Este valor es requerido"
                                            }
                                           
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
                                            required: { 
                                                value: true, 
                                                message: "Este valor es requerido"
                                            }, 
                                            maxLength: {
                                                value: 3,
                                                message: "El valor no puede tener más de 3 caracateres"
                                            },
                                            minLength: {
                                                value: 3,
                                                message: "El valor no puede tener menos de 3 caracateres"
                                            },
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
                                            required: { 
                                                value: true, 
                                                message: "Este valor es requerido"
                                            }
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
                                            required: { 
                                                value: true, 
                                                message: "Este valor es requerido"
                                            },
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
                                            required: { 
                                                value: true, 
                                                message: "Este valor es requerido",
                                            },
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