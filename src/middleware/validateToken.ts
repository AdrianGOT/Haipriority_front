import { useClient } from "../app/hooks/useClient";

// Funtion check token
export const validaToken = (): boolean => {
    const token = localStorage.getItem("token") || '';
    const hasToken = !!token;

    return hasToken;
}