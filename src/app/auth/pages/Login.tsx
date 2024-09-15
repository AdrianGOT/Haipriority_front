import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { ClientLogin } from "../../../interfaces/client.interfaces";
import { useLoginFetch } from "../hooks/useLoginFetch";
import toast from "react-hot-toast";

const Login = () => {
    const {register, handleSubmit, formState: {errors} } = useForm();
    const [data, setData] = useState<ClientLogin | null>(null);
    const { loading, finishMsg } = useLoginFetch(data);
    const navigate = useNavigate(); 


    useEffect(()=> {
        if(!finishMsg) return;
        
        toast.success(finishMsg);
        navigate("/");

    },[finishMsg])
    
    const submit =  handleSubmit(info => {
        console.log(info);
        setData(info as unknown as ClientLogin);
    })


    return (
        <>
            <h3>Inicio de sesion</h3>
            
            <form className="form" onSubmit={submit}>
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
                                {...register("password",{
                                    required: { 
                                        value: true, 
                                        message: "Este valor es requerido"
                                    }
                                })}
                                error={errors.password? true : false}
                                label="password" 
                                variant="outlined"
                                focused
                                sx={{ width: "100%" }}
                                type="password" 
                                size="small"/>

                    { 
                        errors["password"] && (
                        <span className="error-text"> 
                            { errors["password"].message as string } 
                        </span>)
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
                    Iniciar sesión
                </LoadingButton>
            </form>

            <footer className="auth__footer">
                <p> ¿No tienes una cuenta? </p>
                <Link to="/auth/register" > Registrate </Link>    
            </footer>       

        </>
    )
}

export default Login;