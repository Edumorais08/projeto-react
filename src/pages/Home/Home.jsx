import { useState, useEffect } from "react";
import axios from "axios";
import { useFavorites } from "../../context/FavoriteContext";
import MovieCard from "../../components/MovieCard/MovieCard";

import "./Home.css";

const Home = () => {
  const API_KEY = "a1b7267d6ebf746eff71cf7a8801bc27";

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const { favorites } = useFavorites();

  useEffect(() => {
    getNowPlayingMovies();
    getUpcomingMovies();
  }, []);

  const getNowPlayingMovies = () => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/movie/now_playing?region=BR",
      params: {
        api_key: API_KEY,
        language: "pt-BR",
      },
    }).then((response) => {
      setNowPlayingMovies(response.data.results);
    });
  };

  const getUpcomingMovies = () => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/movie/upcoming?region=BR",
      params: {
        api_key: API_KEY,
        language: "pt-BR",
      },
    }).then((response) => {
      setUpcomingMovies(response.data.results);
    });
  };

  return (
    <div>
      {/* Seção de "Nos Cinemas" */}
      <section>
        <h2 className="category-title" id="nos-cinemas">Nos Cinemas</h2>
        <ul className="movie-list">
          {nowPlayingMovies.map((nowPlayingMovie) => (
            <MovieCard
              id={nowPlayingMovie.id}
              key={nowPlayingMovie.id}
              title={nowPlayingMovie.title}
              poster_path={nowPlayingMovie.poster_path}
              release_date={nowPlayingMovie.release_date}
              movie={nowPlayingMovie}
            />
          ))}
        </ul>
      </section>

      {/* Seção de "Em Breve" */}
      <section>
        <h2 className="category-title" id="em-breve">Em Breve</h2>
        <ul className="movie-list">
          {upcomingMovies.map((upcomingMovie) => (
            <MovieCard
              id={upcomingMovie.id}
              key={upcomingMovie.id}
              title={upcomingMovie.title}
              poster_path={upcomingMovie.poster_path}
              release_date={upcomingMovie.release_date}
              movie={upcomingMovie}
            />
          ))}
        </ul>
      </section>

       {/* Seção de Filmes Favoritos */}
       <section className="favorites-container">
        <h1 className="favorites-title" id="favoritos">Filmes Favoritos</h1>
        {favorites.length > 0 ? (
          <ul className="favorites-grid">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
              />
            ))}
          </ul>
        ) : (
          <p className="favorites-empty">
            Você ainda não adicionou nenhum filme aos favoritos.
          </p>
        )}
      </section>    
          
    </div>
  );
};

export default Home;
