import React from 'react'

function GenreName({movie}) {
  return (
    <div>GenreName {movie?.genres?.name}</div>
  )
}

export default GenreName