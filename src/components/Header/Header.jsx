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
     <div className='header-container'>
       <Link to='/' className='logo'> <h1>CineTrail</h1></Link>
       <div className='search-container'>
        <input className='search-input' type="text" placeholder='Search Movies' />
        </div>
        
        <div className='header-icon-container'>
            {
                darkMode?
                <div className='header-button'>
                <MdOutlineLightMode className="theme-button theme-button-active"/>
                <MdOutlineDarkMode className='theme-button' onClick={() => setDarkMode(!darkMode)}/>
                </div>
                :
                <div className='header-button'>
                <MdOutlineDarkMode className="theme-button theme-button-active"/>
                <MdOutlineLightMode className='theme-button' onClick={() => setDarkMode(!darkMode)} />
                </div>
            }
        </div> 
        <div>   
            <button className='create-account-btn'>Create Account</button>
      </div>

     </div>
   )
 }
 
 export default Header