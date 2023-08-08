import React, { useEffect, useState } from 'react';
import './row.css';
import axios from 'axios';

function Row({title,fetch_Url}) {
  const [movies, setMovies] = useState([]);
 
  const [hoveredImg, setHoveredImg] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredImg(index);
  
  };

  const handleMouseLeave = () => {
    setHoveredImg(null);
   
  };
  const base_url = "https://image.tmdb.org/t/p/original/";

 
  useEffect(()=> {
    async function fetchData() {
      try {

      const request = await axios.get(fetch_Url)
      setMovies(request.data.results);
      return request;
        
      } catch (error) {
        console.log(error);
      }
      
    }
    fetchData();
  },[fetch_Url]);
  console.log(movies);

  function truncate(string,n){
    return string?.length > n ? string.substr(0,n-1)+ '...' : string;
  }

  return (
    <div className='row'>
      
      <h2>{title}</h2>
      <div className='card '>
        {movies.map((movie,index) => {

          return (
            
              <div
              className='card__gradient' onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave} 
                    style={{transformOrigin:`${index === 0 ? '-5%' : '50%'} 50%`}}
              >
                
                { (hoveredImg !== index) ? ( 
                 <div className='card__container'>
                  <img 
                      className='card__img'
                      key={movie.id}
                      src={`${base_url}${movie.poster_path || movie.backdrop_path}`}
                      alt={movie.name}
                    >
                    </img>
                 </div>
                 ) : (
                  <div className='card__container2'>
                  <img 
                      className='card__img'
                      key={movie.id}
                      src={`${base_url}${movie.poster_path || movie.backdrop_path}`}
                      alt={movie.name}
                    >
                      
                    </img>
                    <div className='banner__buttons' style={{position:"absolute",width:"100%",top:"100%",zIndex:"2",backgroundColor:"#1a1918",height:"50px"}}>
                      <button style={{ width:"160px",height:"30px",fontSize:"0.5rem",marginRight:"0.2rem",marginLeft:"1rem",color:"black",backgroundColor:"white"}}><i className="fa-solid fa-play" style={{color: "black"}}></i>&nbsp;&nbsp;Watch Now</button>
                      <button style={{width:"30px",height:"30px",fontSize:"0.5rem",color:"white",backgroundColor:"#2e2d2a"}} className='plus__button'>+</button>
                    </div>
                    <div style={{zIndex:"3",fontSize:"50px",top:"122%",width:"100%",height:"60px",position:"absolute",backgroundColor:"#1a1918",borderRadius:"0 0 5px 5px"}}>
                      <div className='card__details'>
                      <h2 style={{color:"smokywhite"}}><pre>{movie?.release_date?.slice(0,4)||"2023"}   <i className="fa-solid fa-star" style={{color:"#fdaa12"}}> </i>{movie?.vote_average || "6"}   </pre></h2>
                      <h2 style={{fontSize:"0.4rem",backgroundColor:"rgba(128,128,128,0.5)",padding:"3px",borderRadius:"2px"}}>U/A 16+</h2>
                      
                    </div>
                    <h2 style={{fontSize:"0.5rem",padding:"5px",color:"gray"}}><p>{truncate(movie?.overview,90) || `Very interesting and entertaining , watch now`}</p></h2>
                    </div>
                      
                 </div>
                  
                 )
        }
                  
          
              </div>
          )
        })}

     </div>
    </div>
  )
}

export default Row;