import {  useEffect, useState } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext";
import { signOut } from "firebase/auth";


export const useLogout = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false)
    const {dispatch} = useAuthContext();
    const [isCancelled, setCancelled] = useState(false)
    
    const logout = async()=>{
        setError(null);
        setLoading(true);

        // sign the user out
        try{
            await signOut(auth);

            // dispatch logout action :
            dispatch({type: "LOGOUT" })

            if(!isCancelled){
                
            setLoading(false)
            setError(null)
            }

        }catch(error){
            if(!isCancelled){
            console.log(error.message);
            setError(error.message);
            }
        }
    }

    useEffect(()=>{
        return ()=>{
            setCancelled(true)
        }
    },[])

    return {error, isLoading, logout}
}