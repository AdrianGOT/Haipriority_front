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
    "maxLength": (value: number) => {
        return {
            value,
            message: `El valor no puede tener más de ${value} caracateres`
        }
    },
    "minLength": (value: number) => {
        return {
            value,
            message: `El valor no puede tener menos de ${value} caracateres`
        }
    },
    "range": (currValue: number, minValue: number, maxValue: number) => {
        const isInRange = minValue <= currValue && maxValue >= currValue;

        return  isInRange || `El valor debe estar entre los valores ${minValue} y ${maxValue}`

    }

}