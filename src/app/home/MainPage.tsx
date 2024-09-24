
import { lazy, Suspense, useEffect } from 'react';
import { ToolBar } from '../shared/ToolBar';
import { Outlet } from 'react-router-dom';
import { useGeneral } from '../hooks/useGeneral';
import "./mainPage.css"

const SideNav = lazy(()=> import('../shared/SideNav') )

const MainPage = () => {
    const {
        client,
        secretKey,
        getKeyToDecode,
        getClientInfoByToken,
    } = useGeneral();

    
    useEffect(() => {
        if(client && client.id === 0) getClientInfoByToken();
        
        const setInitConfig = async () =>{
            if(!secretKey) await getKeyToDecode();
        }
        
        setInitConfig();
    }, []);
     
    const hasPrivateKey = secretKey.length > 1;    

    return (
            <>
                { hasPrivateKey && (

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

                )}
            </>
        )
    
}

export default MainPage;