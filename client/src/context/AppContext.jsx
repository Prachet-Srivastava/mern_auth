/* eslint-disable react-refresh/only-export-components, react-hooks/set-state-in-effect */
import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) =>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL 
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setuserData] = useState(false);

    const getUserData = useCallback(async (showError = true)=>{
        try{
            axios.defaults.withCredentials = true
            const {data} = await axios.get(backendUrl + '/api/user/data')
            if(data.success){
                setuserData(data.userData)
                return true
            }

            setuserData(false)
            if(showError){
                toast.error(data.message)
            }
            return false
        }catch(error){
            setuserData(false)
            if(showError){
                toast.error(error.response?.data?.message || error.message)
            }
            return false
        }
    }, [backendUrl])


    const getAuthState = useCallback(async ()=>{
        try{
            axios.defaults.withCredentials = true
            const {data} = await axios.post(backendUrl + '/api/auth/is-auth')
            if(data.success){
                setIsLoggedin(true)
                await getUserData(false)
            }else{
                setIsLoggedin(false)
                setuserData(false)
            }
        }catch{
            setIsLoggedin(false)
            setuserData(false)
        }
    }, [backendUrl, getUserData])

    useEffect(()=>{
        getAuthState()
    }, [getAuthState])
    
    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setuserData,
        getUserData,
        getAuthState,

    }


    return(
        <AppContext.Provider value={value}>
            {props.children}

        </AppContext.Provider>
    )
}
