import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './sidebar';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [isClicked, setisClicked] = useState(false);
  const [showElement, setShowElement] = useState(false);
  const [formData, setFormData] = useState({ email:'', password:''});
  const [signUp , setSignUp] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSignUp = () => {
    setSignUp(!signUp);
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const URL = signUp ? 'register':'login';

    axios.post(`http://localhost:5000/api/${URL}`,formData)
    .then((response) => {
      console.log(response.data);
      formRef.current.reset();
      URL === 'login' && navigate('/');
      
    }).catch((error) => {
      console.log(error);
    });
    
  };

  const handleClick = () => {
    setisClicked(!isClicked);
  }

  useEffect(() => {
    let timeoutId;

    if (isClicked) {
      timeoutId = setTimeout(() => {
        setShowElement(true);
      }, 500);
    } else {
      setShowElement(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isClicked]);

  return (
    <>
     <Sidebar/>
     <button className='button__help'><i className="fa-regular fa-circle-question" style={{color: "#ffffff"}}></i> Help & Support</button>
    { !isClicked ?
    
      <div className='login' >
        <img src='https://img1.hotstarext.com/image/upload/f_auto,q_90,w_640/feature/myspace/my_space_login_in.png' alt=''></img>
        <h1>Login to Disney+ Hotstar</h1>
        <h2>Start watching where you left off, personalise for kids and more</h2>
        <button className='login__button' onClick={handleClick}>Log In</button>
    
    </div> :  showElement && 
                  <div className='login__back'>
                    <div className='login__screen'>
                      <i className="fa-solid fa-xmark" style={{color:"gray",position:"relative",fontSize:"2rem",top:"2%",left:"95%",cursor:"pointer"}} onClick={handleClick}></i>
                      <div className='login__box'>
                        <h1 style={{color:"smokewhite"}}>Login or sign up to continue </h1>
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <fieldset>
                              <legend>email</legend>
                              <input
                               type='email'
                               name='email'
                               value={formData.email}
                               onChange={handleChange}
          
                              >
                              </input>
                            </fieldset>
                            <fieldset>
                              <legend>password</legend>
                              <input
                               type='password'
                               name='password'
                               value={formData.password}
                               onChange={handleChange}
                              >
                              </input>
                            </fieldset>
                            
                            <button type='submit'>{ signUp ? 'Register':'Login'}</button>
                        </form>
                        <h3 style={{color:"blue",marginTop:"2rem", fontWeight:"lighters",cursor:"pointer"}} onClick={handleSignUp}>{ signUp?'Sign in': 'Sign Up'}</h3>

                      </div>
                    </div>
                </div>
    }
    </>
  );
  }

export default Login;