import { useClient } from "../app/hooks/useClient";
import { ROLES } from "../app/home/pages/client/interfaces/client.interfaces";

// Funtion check token
export const validaToken = (): boolean => {
    const token = localStorage.getItem("token") || '';
    const hasToken = !!token;

    return hasToken;
}

export const validateRole = (roles: ROLES[]): boolean => {
    const { client } = useClient();
    return client.roles.some(role =>roles.includes(role)) ;
}