import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useForm } from "react-hook-form";
import { useGeneral } from "../../../../hooks/useGeneral";
import { useEffect } from "react";
import { generateDateToString } from "../../../../helpers/dateHelper";
import { DebitCardComplete } from "../interfaces/debitCard";
import { generateCardName } from "../../../../helpers/transformClientInfo";

export interface SimpleDialogProps {
    open: boolean;
    card?: DebitCardComplete;
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

    const sendData = handleSubmit(_ => {
        const values = watch();         
        onClose(values); 
        reset();
    })

    return (
         <Dialog onClose={handleClose} open={open}>
            <DialogTitle textAlign={"center"}>{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={sendData}  className="form-dialog general-form debit-card-areas">
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
                </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={sendData}>Guardar</Button>
            </DialogActions>
        </Dialog>
    )
}