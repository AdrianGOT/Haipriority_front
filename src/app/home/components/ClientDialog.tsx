import { Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useGeneral } from "../../hooks/useGeneral";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Client, InitClient, ROLES } from "../pages/client/interfaces/client.interfaces";
import toast from "react-hot-toast";
import InfoIcon from '@mui/icons-material/Info';
import { formValidators } from "../../validators/formValidators";
import RefreshIcon from '@mui/icons-material/Refresh';

export interface SimpleDialogProps {
    open: boolean;
    clientSelected: InitClient;
    onClose: (value: any) => void;
}

export const ClientDialog = (props: SimpleDialogProps) => {
    const { open, onClose, clientSelected} = props;
    const { client } = useGeneral();
    const createMode = clientSelected.id === 0;

    
    const {
        register, 
        handleSubmit,
        watch,
        formState: {errors},
        setValue,
        reset,
    } = useForm();

    useEffect(() => {
       
        // if(!detectedChanges(watch())) return;
        
        setTimeout(() => {
            
            setValue("name", clientSelected.name);
            setValue("email", clientSelected.email);
            setValue("phoneNumber", clientSelected.phoneNumber);
            setValue("password","");
            setValue("password_confirm","");
        })

        if(!open) {
            
            reset({
                "name": "",
                "email": "",
                "phoneNumber": 0,
                "password": "",
                "password_confirm": "",
            });
        } 
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

    const handleSendInfo = handleSubmit(data => {
        const password = data.password || "";
        
        delete data.password;
        delete data.password_confirm;

        const values: Partial<InitClient> = data;
        const hasChange = detectedChanges(values);
        
        if(!hasChange && !password){
            toast("No hay valores diferentes",{
                icon: <InfoIcon/>
            });
            return;
        }

        if(password) data = {...data, password}
        if(clientSelected.id) data = { ...data, id: clientSelected.id}
        onClose(data);
    })

    const handleRemoveRole = () => {

    }

    const RoleList = [ROLES.admin, ROLES.user];

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle textAlign={"center"}> Editar información del cliente </DialogTitle>
            <DialogContent>

                <form onSubmit={handleSendInfo} className="general-form ">
    
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

                    

                    {!createMode && (
                        <>
                            <hr />
                            <h4> Actualizar contraseña </h4>
                        </>
                    )}

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
                
                {/* Lo siguiente es para comprar si se encuentra el usuario entrando en el dialog 
                    de editar / crear client desde el toolbar o desde el modulo de cliente. 
                    Si los ids coinciden es porque está accediendo desde el toolbar, de lo contrario desde
                    el modulo de cliente.
                */}
                    {(client.id !== clientSelected.id )&& (
                        <>
                            <hr />
                            <h4> Actualizar Roles </h4>
                    

                            <Stack direction={"row"} spacing={2} alignItems ={"center"}>
                                <strong> Roles: </strong>
                                { clientSelected?.roles.map( role => 
                                    <Chip 
                                        key={role} 
                                        label={role} 
                                        variant="outlined"
                                        onDelete={handleRemoveRole}/> 
                                    ) 
                                }

                                <IconButton >
                                    <RefreshIcon/>
                                </IconButton>
                            </Stack>
                        </>
                    )}

                </form>
          
                {/* Lo siguiente es para comprar si se encuentra el usuario entrando en el dialog 
                    de editar / crear client desde el toolbar o desde el modulo de cliente. 
                    Si los ids coinciden es porque está accediendo desde el toolbar, de lo contrario desde
                    el modulo de cliente.
                */}
                {
                    client.id === clientSelected.id &&  (
                        <Stack direction={"row"} spacing={2} alignItems ={"center"}>
                            <strong> Roles: </strong>
                            { client?.roles.map( role => <Chip key={role} label={role} variant="outlined"/> ) }
                        </Stack>
                    )
                }

            </DialogContent>
            
            <DialogActions>
                <Button onClick={handleClose} size="small">Cerrar</Button>
            
                <Button 
                    variant="contained" 
                    onClick={handleSendInfo} 
                    size="small">
                        {createMode? "Crear cliente" : "Actualizar"}
                </Button>
            
            </DialogActions>

        </Dialog>
    )
}