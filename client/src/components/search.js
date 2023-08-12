import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './search.css';
import Sidebar from './sidebar';
import Row from './row';
import requests from '../Requests';
import axios from 'axios';

function Search() {
  const [searchTerm, setSearchTerm] = useState();
  const API_KEY = "75c96f1193d4be72246c9389e7bec800";
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`; 
  
  const handleSearch = async (e) => {
    
    setSearchTerm(e.target.value);
    await axios.post("http://localhost:5000/api/search",{movieTitle:"Avatar"})
    .then((response) => {
      console.log(response.data);
      
    }).catch((error) => {
      console.log(error);
    });

  }
  return (
    <>
      <Sidebar/>
      <div className='search'>
      <div className='icons'><i className="fa-solid fa-magnifying-glass" ></i></div>
      <input 
        type='text' 
        placeholder='Movies,shows and more'
        onChange={handleSearch}
        value={searchTerm}

        >

      </input>
      </div>

    
      <div className='search__row'>
        <div className='search__row__display'>
        <Row title='Popular Searches' className='search__row' fetch_Url = {`${searchTerm ? URL :requests.fetchTrending}`}/>
        </div>
        
      </div> 
           
    </>
  )
}

export default Search;