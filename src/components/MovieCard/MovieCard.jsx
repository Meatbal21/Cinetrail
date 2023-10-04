import React, { useState } from 'react'
import './MovieCard.css'
import { Link } from 'react-router-dom'
import Ratings from '../Ratings/Ratings'

function MovieCard({data, imageUrl, radius, height, width, cardStyle, imageBaseUrl}) {

  const [rating, setRating] = useState(Math.round(data?.vote_average/2))

  const imageStyle={
    backgroundImage: `url("https://image.tmdb.org/t/p/w500//${imageUrl}")`,
    width: width,
    height: height,
    backgroundSize: 'cover',
    backgroundPosition: "center",
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    borderRadius: radius,
    boxShadow: cardStyle==="popular-card"?"0px 0px 10px 0px rgba(118,118,118,0.75)":null
  }
  


  return (
    <Link to={data.id ? `/moviedetails/${data?.id}` : `/moviedetails${data?.tmdb_id}`} className={cardStyle}>

    


    <div style={imageStyle}>
      <div className="movie-info-top">
        <Ratings movieRating={rating}/>
      </div>
      <div className="movie-info-bottom">
        <p>{data?.title}</p>
        <p>Rating: {rating}</p>
      </div>
    </div>

    {
      cardStyle==='top-rated-card'
      ? <p>{data?.title}</p>
      : null
    }
    </Link> 
  )
}

export default MovieCard