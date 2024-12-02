import { useState, useEffect } from "react";
import axios from "axios";

import MovieCard from "../../components/MovieCard/MovieCard";

import "./Home.css";

const Home = () => {
  const API_KEY = "a1b7267d6ebf746eff71cf7a8801bc27";

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [sortedNowPlayingMovies, setSortedNowPlayingMovies] = useState([]);
  const [sortedUpcomingMovies, setSortedUpcomingMovies] = useState([]);
  const [filter, setFilter] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");
  

  useEffect(() => {
    getNowPlayingMovies();
    getUpcomingMovies();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filter, nowPlayingMovies, upcomingMovies]);

  useEffect(() => {
    applySearchFilter();
  }, [searchQuery, nowPlayingMovies, upcomingMovies]);

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
      setSortedNowPlayingMovies(response.data.results);
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
      setSortedUpcomingMovies(response.data.results);
    });
  };


  const applyFilter = () => {
    const sortMovies = (movies) => {
      if (filter === "alphabetical") {
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      } else if (filter === "release_date") {
        return [...movies].sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
      }
      return movies;
    };

    setSortedNowPlayingMovies(sortMovies(nowPlayingMovies));
    setSortedUpcomingMovies(sortMovies(upcomingMovies));
  };


  const applySearchFilter = () => {
    const filterMoviesBySearch = (movies) =>
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

    setSortedNowPlayingMovies(filterMoviesBySearch(nowPlayingMovies));
    setSortedUpcomingMovies(filterMoviesBySearch(upcomingMovies));
  };

  return (
    <div className="control-panel">
      {/* Campo de Busca */}
      <div>
        <label htmlFor="search">Buscar Filme:</label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Digite o nome do filme..."
        />
        <label htmlFor="filter">Ordenar por:</label>
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

  {/* Seção "Em Breve" */ }
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
    </div >
  );
};

export default Home;
