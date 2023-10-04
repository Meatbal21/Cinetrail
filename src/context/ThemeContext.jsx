import { useState, createContext, useEffect } from "react";
//create the context
export const ThemeContext = createContext()

export default function ThemeContextProvider(props){
    //create state
    const [darkMode, setDarkMode] = useState(false)

    useEffect(()=>{
        const theme = localStorage.getItem('darkMode')
        if (theme) {
            setDarkMode(JSON.parse(theme))
        }
        
    }, [])


    return(
        <ThemeContext.Provider value={{darkMode, setDarkMode}} >
            {props.children}
        </ThemeContext.Provider>
    )
}