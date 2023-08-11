import React, {useEffect, useState, useContext} from 'react'
import './MovieDetails.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import Ratings from '../../components/Ratings/Ratings'
import Genre from '../../components/Genre/Genre'
import { ThemeContext } from '../../context/ThemeContext'



function MovieDetails({baseUrl, apiKey, imageBaseUrl}) {
    const {movieid} = useParams();
    const [videoLink, setVideoLink] = useState('');
    const [movie, setMovie] = useState([]);
    const {darkMode,setDarkMode} =useContext(ThemeContext)
    const [movieRating, setMovieRating] = useState(0)

    useEffect(() => {
      axios.get(`${baseUrl}/movie/${movieid}?api_key=${apiKey}`)
      .then(res => {
        console.log(res.data.results)
        setMovie(res.data)
        setMovieRating((res.data.vote_average)/2)
      })
      .catch(err=>console.log(err))
    



    
        axios.get(`${baseUrl}/movie/${movieid}/videos?api_key=${apiKey}&language=en-US`)
        .then(res => {
            console.log(res.data)
            const youtubeLink = res.data.results.filter(item => item.site === 'YouTube' && item.type === 'Trailer')
            setVideoLink(youtubeLink[0]?.key)
        })
        .catch(err => console.log(err))
    }, [movieid])

  return (
    <div className={darkMode ?"movie-details-container":"movie-details-container details-light" }>
    {
        videoLink ?
        <div className='trailer-container'>
          <ReactPlayer className='trailer-player' url={`youtube.com/watch?v=${videoLink}`}/>
        </div>
      :
      <div className='trailer-container-blank' style={{
      backgroundImage: `url("${imageBaseUrl}${movie?.backdrop_path}")`,
      backgroundSize: 'cover',
      backgroundPosition: "center",
      }}><p>No Trailer Released Yet</p>
      </div>
    }

      <div className={darkMode ?"details-container":"details-container details-light" }>
        <div className='title-container'>
          <h1>{movie.title}</h1>
        </div>
        <Ratings movieRating={movieRating} />
        <div className='info-container'>
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="details-poster" />
        </div>
        <p className='movie-details-container'></p>
        <div className='movie-info'>
          <h2>{movie.tagline}</h2>
          <h2>{movie.overview}</h2>
          <h4>Status: <span>{movie.status}</span></h4>
          <h4>Runtime: <span>{movie.runtime} min.</span></h4>
          <h4>Budget: <span>${movie.budget}</span></h4>
          <Genre component='details' movieGenre={movie?.genres} baseUrl={baseUrl} apiKey={apiKey}/>
        </div>
      </div>
      <div className='review-container'>
        <p className='reviews-title'></p>
      </div>
    </div>
    
  )
}

export default MovieDetails