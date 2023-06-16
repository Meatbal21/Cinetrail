import React from 'react'
import StarRatings from 'react-star-ratings'

function Ratings({movieRating}) {
  return (
    <div className='rating'>
        <StarRatings
        rating={movieRating}
        starRatedColor="red"
        //changeRating={this.changeRating}
        numberOfStars={5}
        name='rating'
        starDimension='15px'
        starSpacing='1px'
        starEmptyColor='grey'
        />    
    </div>
  )
}

export default Ratings