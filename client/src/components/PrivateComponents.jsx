import React from 'react'
import useAuthStatus from '../Hooks/useAuthStatus'
import Loading from '../pages/Loading'
import { Navigate, Outlet} from "react-router-dom"

const PrivateComponents = () => {
  
    const {LoggedIn , CheckStatus} = useAuthStatus()

    if(CheckStatus){
        <Loading />
    }

    return LoggedIn ? <Outlet /> : <Navigate to={"/login"} />
  
}

export default PrivateComponents
