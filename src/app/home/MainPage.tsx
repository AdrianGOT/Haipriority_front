
import { lazy, Suspense, useEffect } from 'react';
import { ToolBar } from '../shared/ToolBar';
import { Outlet } from 'react-router-dom';
import { useGeneral } from '../hooks/useGeneral';
import { sendPublicKey } from '../../services/general';
import toast from 'react-hot-toast';
import "./mainPage.css"

const SideNav = lazy(()=> import('../shared/SideNav') )

const MainPage = () => {
    const {
        logout,
        client, 
        privateKey,
        generateKeyToSend,
        getClientInfoByToken,
    } = useGeneral();

    useEffect(() => {
        if(client && client.id === 0) getClientInfoByToken();
        
        const setInitConfig = async () =>{

            if(!privateKey) {
                const publicKey = await generateKeyToSend();
                console.log("lalocura", publicKey);
                const response = await sendPublicKey(publicKey!);
                

                if(!response.ok) {
                    toast.error(response.msg);
                    logout();
                }
                
            }
        }

        setInitConfig();
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
                        <Outlet/>
                </Suspense>
            </div>

        </section>
    )
}

export default MainPage;