import React, { useEffect, useState } from 'react'
import './Slider.css'
import axios from 'axios'

function Slider(apiKey, baseURL) {
    //set up for api calling
    const {upcomingMovies, setUpcomingMovies} = useState([])
    const {index, setIndex} = useState(0)
    const imageBaseUrl = "https://image.tmdb.org/t/p/original"

    useEffect (()=>{
      axios.get(`${baseURL}/movie/upcoming?api_key=${apiKey}`)
      .then(res=>{
          console.log(res.data.results)
          setUpcomingMovies(res.data.results)
      })
      .catch(err=>console.log(err))
    }, [])




    //styling background
    //const sliderStyle = {
      //backgroundImage: `url("${imageBaseUrl}${upcomingMovies[index]?.backdrop_path}")`,

    //}



  return (
    <div /*style={sliderStyle}*/>
      <div>
        Slider
        </div>

    </div>
  )
}

export default Slider