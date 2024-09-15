import { Outlet } from "react-router-dom"
import './auth.css';


export const AuthLayout = () => {
    return(

        <main className='auth-main'>
            <section className='auth-main__container'>
                <Outlet/>
            </section>
        </main>
    )
}