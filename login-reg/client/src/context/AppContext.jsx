import { useState } from "react";
import { createContext } from "react";

export const AppContent = createContext()

export const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [IsLoggedin, setIsLoggedin] = useState(false)
    const [UserData, setUserData] = useState(false)

    const value = {
        backendUrl,
        IsLoggedin, setIsLoggedin,
        UserData, setUserData
    }

    return(
        <AppContent.Provider value= {value}>
            {props.children}
        </AppContent.Provider>
    )
}
