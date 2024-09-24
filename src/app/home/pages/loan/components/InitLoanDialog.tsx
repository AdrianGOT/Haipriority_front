import { useForm } from "react-hook-form";
import { CreateLoanInit } from "../interfaces/initLoans";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { formValidators } from "../../../../validators/formValidators";

export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: CreateLoanInit | null) => void;
}

export const InitLoanDialog = ({open, onClose}: SimpleDialogProps) => {
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        reset
    } = useForm();

    const title = "Crear prestamo módelo";

    
    const handleClose = () => {
        onClose(null)
    }

    const sendData = handleSubmit(data => {

        const newData: CreateLoanInit = {
            title: data.title,
            interest:Number(data.interest),
            amountAllowed:Number(data.amountAllowed),
        }

        reset({
            title: "",
            interest: "",
            amountAllowed: "",
        })
        onClose(newData)

    })

    return (
        <Dialog onClose={handleClose} open={open}>
        <DialogTitle textAlign={"center"}>{title}</DialogTitle>
        <DialogContent>
        <form onSubmit={sendData}  className="form-dialog general-form loan-dialog">
                    <div className="title">
                        <TextField   
                                    {...register("title",{
                                        required: formValidators.required
                                    })}
                                    error={errors["title"]? true : false}
                                    label="Titulo del prestamo" 
                                    variant="outlined" 
                                    focused
                                    sx={{ width: "100%" }}
                                    size="small"/>
                        { 
                            errors["title"] && (
                                <span className="error-text"> 
                                    { errors["title"].message as string } 
                                </span>
                            ) 
                        }
                        
                    </div>

                    <div className="interest">
                        <TextField   
                                    {...register("interest",{
                                        required: formValidators.required,
                                        validate: (value: number) => 
                                            formValidators.range(value, 0, 100)
                                    })}
                                    error={errors.interest? true : false}
                                    label="Interes %" 
                                    variant="outlined" 
                                    focused
                                    type="number"
                                    sx={{ width: "100%" }}
                                    size="small"/>
                        { 
                            errors["interest"] && (
                                <span className="error-text"> 
                                    { errors["interest"].message as string } 
                                </span>
                            ) 
                        }
                    
                    </div>           

                    <div className="amountAllowed">
                        <TextField   
                                    {...register("amountAllowed",{
                                        required: formValidators.required,
                                        
                                    })}
                                    error={errors.amountAllowed? true : false}
                                    label="Dinero permitido" 
                                    variant="outlined" 
                                    focused
                                    type="number"
                                    sx={{ width: "100%" }}
                                    size="small"/>
                        { 
                            errors["amountAllowed"] && (
                                <span className="error-text"> 
                                    { errors["amountAllowed"].message as string } 
                                </span>
                            ) 
                        }
                    
                    </div>           

                </form>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={sendData}>Guardar</Button>
        </DialogActions>
    </Dialog>
    )
}