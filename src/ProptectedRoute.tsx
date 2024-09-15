
import { Navigate, Outlet } from "react-router-dom"

interface Props {
 validations  : (() => boolean)[], 
 redirectTo : string,
}



export const ProtectedRoute = ({validations, redirectTo="/"}:Props) => {
    const hasErr = validations.some(validation => !validation());

    if(hasErr) return <Navigate to={redirectTo}/>
    return <Outlet/>
    
}
