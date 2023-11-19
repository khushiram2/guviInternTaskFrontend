import React from 'react'
import { API } from '../GlopbalApi/GlobalApi'
import { Spinner } from 'react-bootstrap'
import { Navigate, Outlet} from 'react-router-dom'
import axiosInstance from '../AxiosInstance/axiosinstance'

export const PrivateRoute = () => {
    const [valid, setValid]=React.useState(null)
    React.useEffect(()=>{
        const privateAscessible=async()=>{
            const {data}=await axiosInstance.get(`${API}/auth/verify`)
            if(data.successStatus){
                setValid(true)
            }else{
                setValid(false)
            }

        }
        privateAscessible()
    },[])

if(valid===null){
    return <Spinner/>
}else if(valid===true){
    return <Outlet/>
}else{
   return <Navigate to="/login"/>
}

}
