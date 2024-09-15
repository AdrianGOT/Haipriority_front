
// Funtion check token
export const validaToken = (): boolean => {
    console.log("validate Token");
    
    const token = localStorage.getItem("token") || '';
    return !!token;
}