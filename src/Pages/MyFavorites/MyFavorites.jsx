import React, {useContext, useEffect, useState} from 'react'
import './MyFavorites.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import axios from 'axios'

function MyFavorites({serverUrl}) {
    const [movies, setMovies] = useState([])
    const {user,token} = useContext(UserContext)

useEffect(() => {
    axios.get(`${serverUrl}/favoriteMovies/user/${user?._id}`)
    .then(rrs=>{
        console.log(res.data)
        setMovies(res.data.favorites)
    })
    .catch(err=>console.log(err))
}, [user])

  return (
    <div className='favorites-container'>MyFavorites</div>
  )
}

export default MyFavorites