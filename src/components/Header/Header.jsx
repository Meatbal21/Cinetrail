 import React, {useContext} from 'react'
 import './Header.css'
 import { ThemeContext } from '../../context/ThemeContext'
 import { Link } from 'react-router-dom'
 import {MdOutlineLightMode, MdOutlineDarkMode} from 'react-icons/md'
 function Header() {
    //change to global state
    //NOTE {} not []

    const {darkMode, setDarkMode} = useContext(ThemeContext)
  

    return (
      //if true header appears in dark mode else header light mode
      <div className={darkMode ?"header-container":"header-container header-light" }>
        <Link className="logo" to="/">CineTrail</Link>
        <div className="search-container">
          <input className="search-input" placeholder="Search movies..."/>
        </div>
  
  
  
        <div className="header-buttons-container">
          <div className="theme-button-container">
  
               {
                  darkMode 
                  ? <div className="theme-buttons">
                      <MdOutlineLightMode onClick={()=> setDarkMode(!darkMode)} className="theme-icon "/>
                      <MdOutlineDarkMode className="theme-icon theme-icon-active"/>  
                  </div>
                  : <div className="theme-buttons">
                      <MdOutlineLightMode className="theme-icon theme-icon-active"/>
                      <MdOutlineDarkMode onClick={()=> setDarkMode(!darkMode)} className="theme-icon"/>  
                  </div>
               }
  
  
  
  
  
  
           </div>
  
  
          <div>
              <button className="create-account-btn">Create an account</button>
          </div>
        </div>
      </div>
    )
  }
  
 
 export default Header