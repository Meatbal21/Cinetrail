import React, {useEffect, useState} from 'react'
import axios from 'axios'


export default function Genre({apiKey, baseUrl, movieGenre}) {
    const [allGenre, setAllGenre] = useState([])

    useEffect(() => {
        axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`)
        .then((res)=>{
            (console.log(res.data.genres));
            (setAllGenre(res.data.genres));
        })
        .catch(err=>console.log(err))
    }, [])



  return (
    <div style={{display:'flex'}}>
        <p>Genres: &nbsp;</p>
        {movieGenre &&
        movieGenre?.map((id, index)=>{
            for(let i = 0; i < allGenre.length; i++ ){
                if(allGenre[i].id === id){
                    return (<p>{allGenre[i].name}
                    {index === movieGenre.length-1 ? " " : ","} &nbsp;
                    </p>);
                }
            }
        })}
    </div>
  )
}
