import { Outlet } from "react-router-dom"
import './auth.css';
import { useKey } from "./hooks/useKey";


export const AuthLayout = () => {
    useKey();
    return(
        <main className='auth-main'>
            <section className='auth-main__container'>
                <Outlet/>
            </section>
        </main>
    )
}