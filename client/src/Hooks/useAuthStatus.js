import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useAuthStatus = () =>{
    const {user} = useSelector((state) => state.Auth)

    const [LoggedIn , setLoggedIn] = useState(false)
    const [CheckStatus , setCheckStatus] = useState(true)

    useEffect(() =>{
user ? setLoggedIn(true) : setLoggedIn(false)
setCheckStatus(false)
    },[user])

    return {LoggedIn , CheckStatus}

}


export default useAuthStatus