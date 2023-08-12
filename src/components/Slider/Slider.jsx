import React, { useEffect, useState } from 'react'
import './Slider.css'
import axios from 'axios'
import Genre from '../Genre/Genre'
import Ratings from '../Ratings/Ratings'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'

function Slider({apiKey, baseUrl}) {
    //set up for api calling
    const [upcomingMovies, setUpcomingMovies] = useState([])
    //set up for index
    const [index, setIndex] = useState(0)
    //hiding imageURL
    const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
    //calling movierating
    const [movieRating, setMovieRating] = useState([])


    //calling api more slider component, ratings
    useEffect (()=>{
      axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
      .then(res=>{
          console.log(res.data.results)
          setUpcomingMovies(res.data.results)
          const rating= res.data.results.map(movie => movie.vote_average/2)
          setMovieRating(rating)
      })
      .catch(err=>console.log(err))
    }, [])


    //function to slide right
    const handleRight = () =>{
      setIndex(index+1)
      if(index===upcomingMovies.length-1)(
        setIndex(0)
      )
    }
    

    //function to slide left
    const handleLeft = () =>{
      setIndex(index-1)
      if(index===0)(
        setIndex(upcomingMovies.length-1)
      )
    }




    //styling background
    const sliderStyle = {
      backgroundImage: `url("${imageBaseUrl}${upcomingMovies[index]?.backdrop_path}")`,
      backgroundSize: 'cover',
      backgroundPosition: "center",
      backgroundRepeat: 'no-repeat',
      height: "60vh",
      position: 'relative'
    }



  return (
    <div style={sliderStyle}>
      <div className='slider-overlay'></div>
      <MdKeyboardArrowLeft onClick={handleLeft} className='left-arrow' />
      <MdKeyboardArrowRight onClick={handleRight} className='right-arrow' />
      <div className='slider-info'>
        <h1>{upcomingMovies[index]?.title}</h1>
        <p className='slider-description'>{upcomingMovies[index]?.overview.slice(0, 130)}...</p>
        <Genre movieGenre={upcomingMovies[index]?.genre_ids} baseUrl={baseUrl} apiKey={apiKey}/>
        <p>Release Date: {upcomingMovies[index]?.release_date}</p>
        <Ratings movieRating={movieRating[index]} />
        <Link to={`/moviedetails/${upcomingMovies[index]?.id}`} className='see-details'>See Details</Link>


      </div>


    </div>
  )
}

export default Slider