import { Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useClient } from "../../hooks/useClient";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Client, InitClient } from "../../../interfaces/client.interfaces";
import toast from "react-hot-toast";
import InfoIcon from '@mui/icons-material/Info';
import { formValidators } from "../../validators/formValidators";

type ClientUpdate = Pick<InitClient, "email"|"name"|"phoneNumber"> 

export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: any) => void;
}

export const ClientDialog = (props: SimpleDialogProps) => {
    const {open, onClose} = props;
    const [hasChanges, setHasChanges] = useState(false);
    const { client } = useClient();
    const {
        register, 
        handleSubmit,
        watch,
        formState: {errors},
        setValue,
        reset,
    } = useForm();

    useEffect(() => {
    
        if(!detectedChanges(watch())) return;
        
        setTimeout(() => {
            setValue("name", client.name);
            setValue("email", client.email);
            setValue("phoneNumber", client.phoneNumber);
            setValue("password","");
            setValue("password_confirm","");
        })
    }, [open])    
    

    const handleClose = () => {
        onClose(null);
    }

    const detectedChanges = (data: Partial<InitClient>) => {

        const values: Partial<InitClient> = data;

        return Object.keys(values).some( (key) =>{
            const keyVerifyed = key as keyof InitClient;
            return client[keyVerifyed] !== values[keyVerifyed];
        })
    }

    const handleUpdateInfo = handleSubmit(data => {
        const password = data.password || "";
        
        delete data.password;
        delete data.password_confirm;

        const values: Partial<InitClient> = data;
        const hasChange = detectedChanges(values);
        
        if(!hasChange){
            toast("No hay valores diferentes",{
                icon: <InfoIcon/>
            });
            return;
        }

        if(password) data = {...data, password}
        onClose(data);
    })

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle textAlign={"center"}> Editar información del cliente </DialogTitle>
            <DialogContent>

                <form onSubmit={handleUpdateInfo} className="general-form ">
    
                <div>
                        <TextField   
                            {...register("name",{
                                required: formValidators.required
                            })}
                            error={errors.email? true : false}
                            label="Nombre" 
                            variant="outlined" 
                            type="text"
                            focused
                            sx={{ width: "100%" }}
                            size="small"/>
                        { 
                            errors["name"] && (
                                <span className="error-text"> 
                                    { errors["name"].message as string } 
                                </span>
                            ) 
                        }
                        
                    </div>

                    <div>
                        

                        <TextField   
                            {...register("email",{
                                required: formValidators.required
                            })}
                            autoComplete='off'
                            error={errors.email? true : false}
                            label="Email" 
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

                    <div>
                        <TextField   
                            {...register("phoneNumber",{
                                required: formValidators.required
                            })}
                            error={errors.email? true : false}
                            label="Número de telefono" 
                            variant="outlined" 
                            type="number"
                            focused
                            sx={{ width: "100%" }}
                            size="small"/>
                        { 
                            errors["phoneNumber"] && (
                                <span className="error-text"> 
                                    { errors["phoneNumber"].message as string } 
                                </span>
                            ) 
                        }
                        
                    </div>

                    <hr />
                    <h4> Actualizar contraseña </h4>

                    <div>
                        <TextField   
                            {...register("password")}
                            autoComplete='new-password'
                            label="Contraseña" 
                            variant="outlined" 
                            type="password"
                            focused
                            sx={{ width: "100%" }}
                            size="small"/>                
                    </div>
                    <div>
                        <TextField   
                            {...register("password_confirm", {
                                validate : (value: string) => formValidators.confirm_password(value, watch("password"))
                            })}
                            error={errors["password_confirm"]? true : false}
                            label="Confirmar contraseña" 
                            variant="outlined" 
                            type="password"
                            focused
                            sx={{ width: "100%" }}
                            size="small"/>
                        { 
                            errors["password_confirm"] && (
                                <span className="error-text"> 
                                    { errors["password_confirm"].message as string } 
                                </span>
                            ) 
                        }
                        
                    </div>
                </form>
          
                
                <Stack direction={"row"} spacing={2} alignItems ={"center"}>
                    <strong> Roles: </strong>
                    { client.roles.map( role => <Chip key={role} label={role} variant="outlined"/> ) }
                </Stack>

            </DialogContent>
            
            <DialogActions>
                <Button onClick={handleClose} size="small">Cerrar</Button>
            
                <Button 
                    variant="contained" 
                    onClick={handleUpdateInfo} 
                    size="small">
                        Actualizar
                </Button>
            
            </DialogActions>

        </Dialog>
    )
}