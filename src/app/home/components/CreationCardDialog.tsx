import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useForm } from "react-hook-form";
import { Card } from "../pages/creditCard/interfaces/card";
import { useClient } from "../../hooks/useClient";

export interface SimpleDialogProps {
    open: boolean;
    card: Card;
    onClose: (value: any) => void;
  }
  

export const CreationCardDialog = (props: SimpleDialogProps) => {
    const { onClose, open, card } = props;
    const { client } = useClient();
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        setValue
    } = useForm();

    setValue("cardName", client.name);
    setValue("current_amount", 0);
    const handleClose = () => {
        onClose(card)
    }

    
    const sendData = handleSubmit(info => {

    }) 



    return (
         <Dialog onClose={handleClose} open={open}>
            <DialogTitle textAlign={"center"}>{"Asignación de tarjeta de credito"}</DialogTitle>
            <DialogContent>
            <form onSubmit={sendData}  className="form-create">
                      <div className="cvc">
                            <TextField   
                                        {...register("cvc",{
                                            required: { 
                                                value: true, 
                                                message: "Este valor es requerido"
                                            }
                                        })}
                                        error={errors.cvc? true : false}
                                        label="CVC" 
                                        variant="outlined" 
                                        focused
                                        sx={{ width: "100%" }}
                                        size="small"/>
                            { 
                                errors["email"] && (
                                    <span className="error-text"> 
                                        { errors["email"].message as string } 
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
                                            }, disabled: true
                                        })}
                                        error={errors["current_amount"]? true : false}
                                        label="Cantidad actual" 
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
                        <div className="cardName">
                            <TextField   
                                        {...register("cardName",{
                                            required: { 
                                                value: true, 
                                                message: "Este valor es requerido"
                                            }, disabled: true
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
                                            }
                                        })}
                                        error={errors.courtDate? true : false}
                                        label="Día de corte" 
                                        variant="outlined" 
                                        focused
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
                                                message: "Este valor es requerido"
                                            }
                                        })}
                                        error={errors.paymentDate? true : false}
                                        label="Fecha de pago" 
                                        variant="outlined" 
                                        focused
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
            <Button onClick={handleClose}>Guardar</Button>
            </DialogActions>
        </Dialog>
    )
}