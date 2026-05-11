import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Login from './components/Login'
import useGetCurrentUser from './Hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import Generate from './pages/Generate'
import Preview from './pages/Preview'
import { Toaster } from 'react-hot-toast'
export const serverUrl = "http://localhost:8000"
const App = () => {
  useGetCurrentUser()
  const {userData} = useSelector(state=>state.user)
  return (
    
   <BrowserRouter>
   <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
   <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/dashboard' element={userData?<Dashboard/>:<Home/>}/>
    <Route path='/generate' element={userData?<Generate/>:<Home/>}/>
    <Route path='/preview/:slug' element={<Preview />}/>
    {/* <Route path='/pricing' element={<Pricing />}/> */}
   </Routes>
   </BrowserRouter>

  )
}

export default App
