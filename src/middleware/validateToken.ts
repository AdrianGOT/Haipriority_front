import { useGeneral } from "../app/hooks/useGeneral";
import { ROLES } from "../app/home/pages/client/interfaces/client.interfaces";

// Funtion check token
export const validaToken = (): boolean => {
    const token = localStorage.getItem("token") || '';
    const hasToken = !!token;

    return hasToken;
}

export const validateRole = (roles: ROLES[]): boolean => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { client } = useGeneral();
    return client.roles.some(role =>roles.includes(role)) ;
}