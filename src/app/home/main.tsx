
import { lazy, Suspense, useEffect } from 'react';
import { ToolBar } from '../shared/ToolBar';
import "./main.css"
import { Outlet } from 'react-router-dom';
import { useClient } from '../hooks/useClient';
import { CreditcardsProvider } from '../../context/creditCard';

const SideNav = lazy(()=> import('../shared/SideNav') )

const MainPage = () => {
    const {client, getClientInfoByToken} = useClient();

    useEffect(() => {
        if(client && client.id === 0) getClientInfoByToken()
    }, [])


    return (

        <section className='container'>
            <div className='toolbar'>
                <ToolBar />
            </div>
            <div className='sideNav'>
                <Suspense fallback={<h3> loading sidenav ...</h3>}>
                    <SideNav />          
                </Suspense>
            </div>
            <div className='modules'>
                <Suspense fallback={<h3> loading modules ... </h3>}>
                    <CreditcardsProvider>
                        <Outlet/>
                    </CreditcardsProvider>
                </Suspense>
            </div>

        </section>
    )
}

export default MainPage;