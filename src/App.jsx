import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Login from './components/Login'
import useGetCurrentUser from './Hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import Generate from './pages/Generate'
export const serverUrl = "http://localhost:8000"
const App = () => {
  useGetCurrentUser()
  const {userData} = useSelector(state=>state.user)
  return (
    
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/dashboard' element={userData?<Dashboard/>:<Home/>}/>
    <Route path='/generate' element={userData?<Generate/>:<Home/>}/>
    {/* <Route path='/pricing' element={<Pricing />}/> */}
   </Routes>
   </BrowserRouter>

  )
}

export default App
