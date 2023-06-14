import { useState, createContext, useEffect } from "react";
//create the context
export const ThemeContext = createContext()

export default function ThemeContextProvider(props){
    //create state
    const [darkMode, setDarkMode] = useState(false)

    useEffect(
        ()=>{
            console.log('context load')
            //check localstorage to initialize state
            const storeDarkMode = localStorage.getItem('darkMode')
            console.log('value is ', storeDarkMode)
            if(storeDarkMode){
                //only set if there is something in localStorage
                setDarkMode(JSON.parse(storeDarkMode))
            }


        },[] //run once when page loads
    )

    useEffect(
        ()=>{
            console.log('darkMode is ', darkMode)
            //save current state to local
            localStorage.setItem('darkMode', JSON.stringify(darkMode))

        },[darkMode] //run when darkmode changes
    )


    return(
        <ThemeContext.Provider value={{darkMode, setDarkMode}} >
            {props.children}
        </ThemeContext.Provider>
    )
}