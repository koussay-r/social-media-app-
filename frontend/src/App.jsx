import React, {  useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import Login from './components/log_pages/Login'
import { fetchLoginData} from "./components/redux/user"
import Signup from './components/log_pages/Signup'
import {BrowserRouter ,Route,Routes} from 'react-router-dom'
import Home from './components/Home/Home'
import {Toaster} from 'react-hot-toast'
import UserProfile from './components/profile/UserProfile'
import MainLoader from './components/MainLoader'
import FindAccount from './components/log_pages/FindAccount'
import ResetPassword from './components/log_pages/ResetPassword'
import { createContext } from 'react'
export const recoveryCodeContext=createContext()
export default function App() {
  const [recoveryCode,setRecoveryCode]=useState(0)
  const [email,setEmail] = useState("")
  const state=useSelector((state)=>state.user.value)
  console.log(state)
  const dispatch=useDispatch()
  useEffect(()=>{
    const loginIn=async()=>{
      if(state.accountExistCookies){
        try{
          dispatch(fetchLoginData())
        }
        catch(err){
          console.log(err)
        }
      }
    }
    loginIn()
    console.log(state.auth)
  },[])
  return (
    <>
    {
      (state.LoadingUSerData===true||state.accountExistCookies===false||state.UserData)?
    <recoveryCodeContext.Provider value={[recoveryCode,setRecoveryCode,email,setEmail]}>
      <BrowserRouter>
    
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <Routes>
      <Route path="/findAccount" element={<FindAccount/>}/>
      <Route path='/ResetPassword' element={<ResetPassword/>}/>
      {
        state.accountExistCookies?<Route path='/' index element={state.auth&&<Home/>}/>:<Route path='/' index element={<Login/>}/>
      }
      <Route path="/signup" element={<Signup/>}/>
       <Route path='/home' element={state.auth&&<Home/>}/>
       <Route path={`/profile`} element={<UserProfile/>}/>
       </Routes>
    </BrowserRouter> 
      </recoveryCodeContext.Provider>
     :
    <MainLoader/>
    }
    </>
  )
}
