import React, { useState } from 'react';
import './sidebar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useNavigate} from 'react-router-dom';

function Sidebar() {
  const [parentBackground, setParentBackground] = useState('');
  const [parentWidth, setParentWidth] = useState('');
  const navigate = useNavigate();

  function handleOnhover () {
     setParentBackground((prevBackground) => (
      prevBackground === '' ? 'linear-gradient(-90deg,transparent,rgba(37,37,37,0.5),#111)': '' ));
     setParentWidth((prevWidth) => (prevWidth === '' ? '100%' : ''));

  };
 
  
  

  return (
    <div className='sidebar'  style={{background:parentBackground,width:parentWidth}}>
       <div className='sidebar__logo'>
          <img onClick={()=>navigate('/')} src='https://img.hotstar.com/image/upload/v1656431456/web-images/logo-d-plus.svg' alt=''/>
         <button className='sidebar__button'>Subscribe &gt; </button>
       </div>
       <div className='sidebar__icons' onMouseEnter={handleOnhover} onMouseLeave={handleOnhover}>
          <div className='icons' onClick={()=>navigate('/login')}><i class="fa-regular fa-user" ></i><span>My Space</span></div>
          <div className='icons'><i class="fa-solid fa-magnifying-glass" ></i><span>Search</span></div>
          <div className='icons' onClick={()=>navigate('/')}><i class="fa-solid fa-house" ></i><span>Home</span></div>
          <div className='icons'><i class="fa-solid fa-tv" ></i><span>TV</span></div>
          <div className='icons'><i class="fa-solid fa-film" ></i><span>Movies</span></div>
          <div className='icons'><i class="fa-solid fa-volleyball" ></i><span>Sports</span></div>
        </div> 
       
    </div> 
  )
}

export default Sidebar;