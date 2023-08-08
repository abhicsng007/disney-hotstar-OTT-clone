import React, { useEffect, useState } from 'react';
import './banner.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import requests from '../Requests';

function Banner() {
  const [movie, setMovie] = useState([]);
  
  try {
    const fetchData = async ()=> {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length-1)]);
      return request;
    };

    useEffect(() => {
      fetchData();
      const intervalId = setInterval(fetchData,5000);
      return () => clearInterval(intervalId); 
    },[]);
    
  } catch (error) {
    console.log(error);
  }
  

  
 
  function truncate(string,n){
    return string?.length > n ? string.substr(0,n-1)+ '...' : string;
  }

  return (
    <div className='banner' style={{ backgroundSize : "cover",
    backgroundImage : `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
    backgroundPosition : "left top",
    backgroundRepeat: "no-repeat"}}>
     <div className='banner__gradient-overlay'>
      <div className='banner__details'>
        <h1>{movie?.title || movie?.name || movie?.original_name || "MOVIE"}</h1>
        <div className='banner__subdetails'>
          <h2><pre>{movie?.first_air_date?.slice(0,4) || "2020"}<span style={{color:"gray"}}>|</span> <i className="fa-solid fa-star" style={{color:"#fdaa12"}}> </i>{movie?.vote_average || "6"}<span style={{color:"gray"}}>|</span> </pre></h2>
          <div >
            <h2 style={{fontSize:"1rem",backgroundColor:"rgba(128,128,128,0.5)",padding:"3px",borderRadius:"2px"}}>U/A 16+</h2>
          </div>
        </div>
        <h2 style={{fontWeight:"lighter",marginBottom: "1rem"}}><p>{truncate(movie?.overview,150) || `Very interesting and entertaining , watch now`}</p></h2>
        <div className='banner__buttons'>
          <button><i className="fa-solid fa-play" style={{color: "#ffffff"}}></i>&nbsp;&nbsp;Watch Now</button>
          <button className='plus__button'>+</button>
        </div>
      </div>
     </div>
       
    </div>
  )
}

export default Banner;