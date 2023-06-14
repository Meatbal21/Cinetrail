import React from 'react'
import './Homepage.css'
import Slider from '../../components/Slider/Slider'


function Homepage(apiKey, baseURL) {
  return (
    <div className='homepage-container'>
      <Slider apiKey= {apiKey} baseURl= {baseURL}/>
      
      </div>
  )
}

export default Homepage