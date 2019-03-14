import React, { useState,useEffect } from 'react';
//import logo from './logo.svg';
import './../App.css';
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";
import Masonry from 'react-masonry-component';

const masonryOptions = {
  transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const App = ()=>{
  const [loading,setLoading] = useState(true);
  const [movies,setMovies] = useState([]);
  const [errorInfo,setErrorInfo] = useState("");

  useEffect(()=>{
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  },[] )

  const search = (searchValue)=>{
    setLoading(true);
    setErrorInfo("");
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorInfo(jsonResponse.Error);
          setLoading(false);
        }
      });
  }

  return(
    <div className="App">
    <Header text={"HOOK-DEMO"}></Header>
    <Search search={search}></Search>
    <p className="App-intro">Sharing a few of our favourite movies</p>
    {loading && !errorInfo ? <span>Loadig...</span> : errorInfo ? 
     <div className="errorMessage">{errorInfo}</div> : 
     <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'div'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
                {movies.map((movie,index) =>
      <Movie key={`${index}-${movie.Title}`} movie={movie} />
     )}
            </Masonry>
     
  } 
    </div>
  )

}

export default App;
