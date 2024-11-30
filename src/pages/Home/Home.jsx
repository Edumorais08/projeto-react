import { useState, useEffect } from "react";
import axios from 'axios';

import "./Home.css"
import MovieCard from "../../components/MovieCard/MovieCard";

const Home = () => {

  const API_KEY = "a1b7267d6ebf746eff71cf7a8801bc27";

  const [ nowPlayingMovies, setNowPlayingMovies ] = useState([]);

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  const getNowPlayingMovies = () => {
    axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/now_playing?region=BR',
      params: {
        api_key: API_KEY,
        language: 'pt-BR'
      }
    }).then(response => {
      setNowPlayingMovies(response.data.results);
      console.log(response.data.results)
    })
  }

  const [ upcomingMovies, setUpcomingMovies ] = useState([]);

  useEffect(() => {
    getUpcomingMovies();
  }, []);

  const getUpcomingMovies = () => {
    axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/upcoming?region=BR',
      params: {
        api_key: API_KEY,
        language: 'pt-BR'
      }
    }).then(response => {
      setUpcomingMovies(response.data.results);
      console.log(response.data.results)
    })
  }

  return (
    <>
      <h2 className="category-title" id="nos-cinemas">Nos Cinemas</h2>
      <ul className="movie-list">
        {nowPlayingMovies.map((nowPlayingMovie) =>
          <MovieCard 
            key={nowPlayingMovie.id}
            title={nowPlayingMovie.title}
            poster_path={nowPlayingMovie.poster_path}
            release_date={nowPlayingMovie.release_date}
          />
        )}
      </ul>

      <h2 className="category-title" id="em-breve">Em Breve</h2>
      <ul className="movie-list">
        {upcomingMovies.map((upcomingMovie) =>
          <MovieCard 
            key={upcomingMovie.id}
            title={upcomingMovie.title}
            poster_path={upcomingMovie.poster_path}
            release_date={upcomingMovie.release_date}
          />
        )}
      </ul>
    </>
  );
}

export default Home