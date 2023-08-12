import React, {useEffect, useState, useContext} from 'react'
import './MovieDetails.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import Ratings from '../../components/Ratings/Ratings'
import Genre from '../../components/Genre/Genre'
import Review from '../../components/Review/Review'
import { ThemeContext } from '../../context/ThemeContext'



function MovieDetails({baseUrl, apiKey, imageBaseUrl, serverUrl}) {
    const {movieid} = useParams();
    const [videoLink, setVideoLink] = useState('');
    const [movie, setMovie] = useState([]);
    const {darkMode,setDarkMode} =useContext(ThemeContext)
    const [movieRating, setMovieRating] = useState(0)
    const [reviews,setReviews]=useState([]);
    const [totalReviews,setTotalReviews]=useState(0)
    const [reviewNumber,setReviewNumber]=useState(3)

    useEffect(() => {
      axios.get(`${baseUrl}/movie/${movieid}?api_key=${apiKey}`)
      .then(res => {
        console.log(res.data)
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


      axios.get(`${baseUrl}/movie/${movieid}/videos?api_key=${apiKey}&language=en-US`)
      .then(res => {
          console.log(res.data)
          const youtubeLink = res.data.results.filter(item => item.site === 'YouTube' && item.type === 'Trailer')
          setVideoLink(youtubeLink[0]?.key)
      })

        axios.get(`${baseUrl}/movie/${movieid}/reviews?api_key=${apiKey}`)
        .then(res => {
            console.log(res.data)
            setTotalReviews(res.data.total_results)
            setReviews(res.data.results)
        })
        .catch(err => console.log(err))
    }, [movieid])



    const addToFavorites =() => {
      console.log(serverUrl)
      if(!token){
      alert("Please login to add favorites")
      }
      else {
        axios.post(`${serverUrl}/favoritesMovies`,{
          user_id:user._id,
          movie_id:movie.id
        })
        .then(res=>{
          setAdded(true)
        })
        .catch(err=>console.log(err))
      }
    }

    const removeFromFavorites =() => {  
    axios.delete(`${serverUrl}/favoritesMovies/${user._id}/${movie.id}`)
    .then(res=>{
      setAdded(false)
    })
    .catch(err=>console.log(err)) 
    }


    useEffect=(() => {  
    axios.post(`${serverUrl}/favoritesMovies/search`,{
    user_id:user._id,
    tmdb_id:movie.id,
    })
    .then(res=>{
      if(res.data===null){
      setAdded(false)}
      else{
        setAdded(true)
      }
    })
    .catch(err=>console.log(err)) 
    },[user,movie])


  return (
  <div className={darkMode ?"movie-details-container":"movie-details-container details-light" }>
    {
        videoLink ?
        <div className='trailer-container'>
          <ReactPlayer className='trailer-player' url={`youtube.com/watch?v=${videoLink}`}
          config={{
            youtube: {
              playerVars: { showinfo: 1, origin:"http://localhost:3000"}
            }
          }}
          width='100%'
          height='100%'
          />
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

        {
          added
           ?<p className='remove-btn' onClick={removeFromFavorites}>Remove From Favorites</p>
            :<p className='add-btn' onClick={addToFavorites}>Add To Favorites</p>
        }

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
        <p className='reviews-title'>Reviews</p>
          {
            reviews.slice(0,reviewNumber).map(item=> {
              return <Review key={item.id} review={item} />
            })
          }
          {
            reviewNumber >= totalReviews
            ?<p className='review-number' onClick={() => setReviewNumber(3)}><em>end of reviews.Collapse</em></p>
            :<p className='review-number' onClick={() => setReviewNumber(reviewNumber + 3)}><em>read more reviews</em></p>

          }
      </div>
  </div>
    
  )
}

export default MovieDetails