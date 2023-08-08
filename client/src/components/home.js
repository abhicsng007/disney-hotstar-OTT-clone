import React from 'react';
import Sidebar from './sidebar';
import Banner from './banner';
import Row from './row';
import requests from '../Requests';

function Home() {
  return (
    <>
        <Sidebar/>
        <Banner/>
        <Row title='Trending' fetch_Url = {requests.fetchTrending}/>
        <Row title="Originals" fetch_Url={requests.fetchNetflixOriginals}/>
        <Row title='Top Rated' fetch_Url = {requests.fetchTopRated}/>
        <Row title='Action Movies' fetch_Url = {requests.fetchActionMovies}/>
        <Row title='Animation' fetch_Url = {requests.fetchAnimation}/>
        <Row title='Comedy Movies' fetch_Url = {requests.fetchComedyMovies}/>
        <Row title='Horror Movies' fetch_Url = {requests.fetchHorrorMovies}/>
        <Row title='Romance Movies' fetch_Url = {requests.fetchRomanceMovies}/>
        <Row title='Documentaries' fetch_Url = {requests.fetchDocumentaries}/>
        
    </>
  )
}

export default Home;