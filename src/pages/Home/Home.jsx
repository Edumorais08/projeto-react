import { useState, useEffect } from "react";
import axios from "axios";
import { useFavorites } from "../../context/FavoriteContext";
import MovieCard from "../../components/MovieCard/MovieCard";

import "./Home.css";

const Home = () => {
  const API_KEY = "a1b7267d6ebf746eff71cf7a8801bc27";

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [sortedNowPlayingMovies, setSortedNowPlayingMovies] = useState([]);
  const [sortedUpcomingMovies, setSortedUpcomingMovies] = useState([]);
  const [filter, setFilter] = useState("none"); // Estado para o filtro
  const { favorites } = useFavorites();

  useEffect(() => {
    getNowPlayingMovies();
    getUpcomingMovies();
  }, []);

  useEffect(() => {
    applyFilter(); // Reaplica o filtro sempre que ele muda
  }, [filter, nowPlayingMovies, upcomingMovies]);

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
      setSortedNowPlayingMovies(response.data.results); // Inicializa com a lista original
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
      setSortedUpcomingMovies(response.data.results); // Inicializa com a lista original
    });
  };

  // Função para aplicar o filtro
  const applyFilter = () => {
    const sortMovies = (movies) => {
      if (filter === "alphabetical") {
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      } else if (filter === "release_date") {
        return [...movies].sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
      }
      return movies; // Nenhum filtro
    };

    setSortedNowPlayingMovies(sortMovies(nowPlayingMovies));
    setSortedUpcomingMovies(sortMovies(upcomingMovies));
  };

  return (
    <div>
      {/* Seletor de Filtros */}
      <div className="filter-container">
        <label htmlFor="filter">Ordenar por: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="none">Nenhum</option>
          <option value="alphabetical">Ordem Alfabética</option>
          <option value="release_date">Data de Lançamento</option>
        </select>
      </div>

      {/* Seção "Nos Cinemas" */}
      <section id="nos-cinemas">
        <h2 className="category-title">Nos Cinemas</h2>
        <ul className="movie-list">
          {sortedNowPlayingMovies.map((nowPlayingMovie) => (
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

      {/* Seção "Em Breve" */}
      <section id="em-breve">
        <h2 className="category-title">Em Breve</h2>
        <ul className="movie-list">
          {sortedUpcomingMovies.map((upcomingMovie) => (
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

      {/* Seção de Favoritos */}
      <section id="favoritos" className="favorites-container">
        <h1 className="category-title">Filmes Favoritos</h1>
        {favorites.length > 0 ? (
          <ul className="movie-list">
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
