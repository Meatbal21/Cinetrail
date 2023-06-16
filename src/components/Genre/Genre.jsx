import React, {useEffect, useState} from 'react'
import axios from 'axios'



function Genre({baseUrl, apiKey, movieGenre}) {
    //making state for genre
    const [allGenre, setAllGenre] = useState([]);


    useEffect(() => {
         //calling specific name on api not id
        axios.get(`${baseUrl}/genre/list?api_key=${apiKey}`)
        .then(res=>{
         console.log(res.data.genres)
         setAllGenre(res.data.genres)
        })
        .catch(err=>console.log(err))



    },[])


    return (
    <div style={{display: 'flex'}}>
        <p>Genres: </p>
        {movieGenre?.map((id, index)=>{
            const genre = allGenre.find((genre)=> genre.id === id);
            console.log(genre)
            return(
                <p key={id}>
                    {genre?.name}
                    {index !== movieGenre.length - 1 && ',' }
                </p>
            )
        })


        }
        
        </div>
  )
}

export default Genre