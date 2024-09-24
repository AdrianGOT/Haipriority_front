import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { CreatCard } from "../interfaces/card";
import { useForm } from "react-hook-form";
import { formValidators } from "../../../../validators/formValidators";
import { Franchise } from "../../../interfaces/cards";
import { useState } from "react";

export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: CreatCard | null) => void;
}


export const CardDialog = ({open, onClose}: SimpleDialogProps) => {
    const [franchiseSelected, setFranchiseSelected] = useState(Franchise.visa)
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        reset
    } = useForm();

    const title = "Crear tarjeta modelo";

    const handleClose = () => {
        onClose(null)
    }

    const sendData = handleSubmit(data => {

        const newData: CreatCard = {
            franchise: franchiseSelected,
            amountAllowed: Number(data.amountAllowed),
            type: data.cardType 
        }
        reset({
            cardType: "",
            franchise: "",
            amountAllowed: "",
        })
        onClose(newData)

    })

    const handleChange = (event: SelectChangeEvent)=> {
        setFranchiseSelected((event.target.value) as Franchise);
    }


    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle textAlign={"center"}>{title}</DialogTitle>
            <DialogContent>
            <form onSubmit={sendData}  className="form-dialog general-form card-dialog ">
                        <div className="card-type">
                            <TextField   
                                        {...register("cardType",{
                                            required: formValidators.required
                                        })}
                                        error={errors["cardType"]? true : false}
                                        label="Tipo de tarjeta" 
                                        variant="outlined" 
                                        focused
                                        sx={{ width: "100%" }}
                                        size="small"/>
                            { 
                                errors["cardType"] && (
                                    <span className="error-text"> 
                                        { errors["cardType"].message as string } 
                                    </span>
                                ) 
                            }
                            
                        </div>

                        <div className="franchise">
                            <FormControl fullWidth>
                                <InputLabel id="franchise-select-label">Franquicia</InputLabel>
                                <Select
                                    labelId="franchise-select-label"
                                    id="franchise-select"
                                    value={franchiseSelected}
                                    label="Franquicia"
                                    size="small"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={Franchise.visa}>{Franchise.visa}</MenuItem>
                                    <MenuItem value={Franchise.masterCard}>{Franchise.masterCard}</MenuItem>
                                </Select>
                            </FormControl>

                            { 
                                errors["franchise"] && (
                                    <span className="error-text"> 
                                        { errors["franchise"].message as string } 
                                    </span>
                                ) 
                            }
                            
                        </div>

                        <div className="amountAllowed">
                            <TextField   
                                        {...register("amountAllowed",{
                                            required: formValidators.required
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