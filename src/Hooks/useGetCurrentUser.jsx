import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
const useGetCurrentUser = () => {
    useEffect(()=>{
        const getCurrentUser = async ()=>{
            try {
                const result = await axios.get(`${serverUrl}/api/user/me`,
                    {withCredentials:true})
                console.log(result)
                
            } catch (error) {
                // console.log(error);
                
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
