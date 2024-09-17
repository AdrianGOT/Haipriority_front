
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from './app/auth/Layout';

// import { Login } from './app/auth/pages/Login';
// import { Register } from './app/auth/pages/Register';


import { ProtectedRoute } from './ProptectedRoute';

import { Toaster } from 'react-hot-toast';
import './App.css';
import { validaToken } from './middleware/validateToken';
import { lazy, Suspense } from 'react';
import { ClientProvider } from './context/client';


const MainLayout = lazy(()=> import('./app/home/main'));
const LoginComponent = lazy(()=> import('./app/auth/pages/Login'));
const RegisterComponent = lazy(()=> import('./app/auth/pages/Register'));

const CreditCardComponent = lazy(()=> import('./app/home/pages/creditCard/CreditCards'));
const DebitCardComponent = lazy(()=> import('./app/home/pages/debitCard/DebitCard'));
const LoanComponent = lazy(()=> import('./app/home/pages/loan/Loan'));

function App() {
  
  return (
    <>
      <ClientProvider>
        <BrowserRouter>
          <Routes>

            <Route path='/auth/' element={ <AuthLayout/> }>
                <Route index element={ <Navigate to="login"/> }/>
                <Route path='login' element={ 

                  <Suspense fallback={<h3>loadiung login</h3> }>
                    <LoginComponent />
                  </Suspense>
                } />

                <Route path='register' element={ 
                
                <Suspense fallback={<h3>loadiung regiser</h3> }>
                    <RegisterComponent />
                  </Suspense>
                
                } />
        
            </Route>

            <Route element={ <ProtectedRoute validations={[validaToken]} redirectTo='/auth/'/>} >
                <Route path='/' element={<MainLayout/>}>
                  <Route index element={<Navigate to={"credit-card"}/>}></Route>
                  <Route path='credit-card' element={<CreditCardComponent/>}/>
                  <Route path='debit-card' element={<DebitCardComponent/>}/>
                  <Route path='loan' element={<LoanComponent/>}/>
                  {/* <Route path='loan' element={<LoanComponent/>}/>  TODO CLIENTS*/}
                </Route>
                
            </Route>

          </Routes>
        </BrowserRouter>
      </ClientProvider>

      <div>
        <Toaster position="top-center"/>
      </div>
    </>


  )
}

export default App
