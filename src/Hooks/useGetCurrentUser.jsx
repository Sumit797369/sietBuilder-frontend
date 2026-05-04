import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
const useGetCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const getCurrentUser = async ()=>{
            try {
                const result = await axios.get(`${serverUrl}/api/user/me`,
                    {withCredentials:true})
              dispatch(setUserData(result.data))
                
            } catch (error) {
                console.log(error);
                
            }
        }
        getCurrentUser()
    },[])
  return (
    <div>
    </div>
  )
}

export default useGetCurrentUser
