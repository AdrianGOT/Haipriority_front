export const formValidators = {
    "required":{ 
        value: true, 
        message: "Este valor es requerido"
    },
    "email_pattern": {
        value: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
        message: "El correo debe tener un formato valido"
    },
    "confirm_password": (value: string, otherValue?: string) => {
        return value === otherValue || "No coinciden las contraseñas"        
    }, 

}