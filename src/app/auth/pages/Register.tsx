import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClientRegister } from "../../../interfaces/client.interfaces";
import { useRegisterFetch } from "../hooks/useRegisterFetch";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const Register = () => {

        const [data, setData] = useState<ClientRegister | null>(null);
        const { loading, finishMsg } = useRegisterFetch(data);
        const navigate = useNavigate();

        const {
            watch,
            register, 
            handleSubmit, 
            formState: {errors},
        } = useForm<ClientRegister>();
    
    
        useEffect(()=> {
            if(!finishMsg) return;

            toast.success(`${finishMsg} 
                \n Ahora puede iniciar sesión con sus datos`, {
                duration: 2000
            })
    
            navigate('/auth/login');
            
        }, [finishMsg])
        

        const validatePasswords = (value: string): string | boolean => {
            const pass = watch("password");
            return value === pass || "No coinciden las contraseñas"        
        }
    
        const submit = handleSubmit(info => {
            console.log(info);
            setData(info);
    
        })
    
        return (
            <>
                <h3>Registarse</h3>
    
                <form className="form" onSubmit={submit}>
                    <div>
                        <TextField 
                                    label="Nombre"
                                    {...register("name", {
                                        required: { 
                                            value: true, 
                                            message: "Este valor es requerido"
                                        }
                                    })}
                                    error={errors.name? true : false}
                                    variant="outlined"
                                    focused
                                    disabled={loading}
                                    sx={{
                                        width: "100%"
                                    }}
                                    size="small"/>
    
                        { errors["name"] && (
                            <span className="error-text"> 
                                { errors["name"].message as string } 
                            </span>
                        )}
                    </div>
    
                    <div>
                        <TextField   
                                    {...register("email",{
                                        required: { 
                                            value: true, 
                                            message: "Este valor es requerido"
                                        }, pattern: {
                                            value: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
                                            message: "El correo debe ser valido"
                                        }
                                    })}
                                    error={errors.email? true : false}
                                    label="Email" 
                                    variant="outlined" 
                                    focused
                                    disabled={loading}
                                    sx={{
                                        width: "100%"
                                    }}
                                    size="small"/>
                        { 
                            errors["email"] && (
                                <span className="error-text"> 
                                    { errors["email"].message as string } 
                                </span>
                            ) }
                        
                    </div>
    
                    <div>
                        <TextField   
                                    {...register("phoneNumber",{
                                        required: { 
                                            value: true, 
                                            message: "Este valor es requerido"
                                        }
                                    })}
                                    error={errors.phoneNumber? true : false}
                                    label="Telefono" 
                                    variant="outlined"
                                    disabled={loading}
                                    focused
                                    sx={{
                                        width: "100%"
                                    }}
                                    type="number" 
                                    size="small"/>
    
                        { 
                            errors["phoneNumber"] && (
                            <span className="error-text"> 
                                { errors["phoneNumber"].message as string } 
                            </span>)
                        }
                    </div>
    
                    <div>
                        <TextField   
                                    {...register("password",{
                                        required: { 
                                            value: true, 
                                            message: "Este valor es requerido"
                                        }
                                    })}
                                    error={errors.password? true : false}
                                    label="Contraseña" 
                                    variant="outlined"
                                    focused
                                    disabled={loading}
                                    sx={{
                                        width: "100%"
                                    }}
                                    type="password"
                                    size="small"/>
    
                        { 
                            errors["password"] && (
                            <span className="error-text"> 
                                { errors["password"].message as string } 
                            </span>)
                        }
                    </div>
    
                    <div>
                        <TextField
                                {...register("confirm_password",{
                                    required: { 
                                        value: true, 
                                        message: "Este valor es requerido"  
                                    }, 
                                    validate: (value: string)=> validatePasswords(value)
                                    
                                })}
                                error={errors["confirm_password"]? true : false}
                                label="Confirmar contraseña" 
                                variant="outlined" 
                                focused
                                disabled={loading}
                                sx={{
                                    width: "100%"
                                }}
                                type="password" 
                                size="small"/>
                                
                        { 
                            errors["confirm_password"] && (
                                <span className="error-text"> 
                                    { errors["confirm_password"].message as string } 
                                </span> 
                            )
                        }
                    </div>
    
                    <LoadingButton
                      size="medium"
                      variant="outlined" 
                      type="submit"
                      loading={loading}
                      loadingPosition="center"
                      sx={{ width: "100%" }}
                    >
                        Registrarse
                    </LoadingButton>
                </form>
    
                <footer className="auth__footer">
                    <p> ¿Posees una cuenta? </p>
                    <Link to="/auth/login" > inicia sesión </Link>    
                </footer>       
    
            </>
    )
}

export default Register;