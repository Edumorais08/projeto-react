import "./Movie.css"
import axios from "axios";

import noImg from "../../assets/no-img.png"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ActorCard from "../../components/ActorCard/ActorCard";


const Movie = () => {

  const API_KEY = "a1b7267d6ebf746eff71cf7a8801bc27";

  const [movie, setMovie] = useState([])
  const {id} = useParams()

  const getMovie = (movieID) => {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/${movieID}`,
      params: {
        api_key: API_KEY,
        language: 'pt-BR'
      }
    }).then(response => {
      setMovie(response.data);
      console.log(response.data)
    })
  }

  useEffect(() => {
    getMovie(id)
  }, [id]);

  const [actors, setActors] =useState([])

  const getActors = (movieID) => {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/${movieID}/credits`,
      params: {
        api_key: API_KEY,
        language: 'pt-BR'
      }
    }).then(response => {
      setActors(response.data.cast)
      console.log(response.data.cast)
    })
  }

  useEffect(() => {
    getActors(id);
  }, [id]);


  const date_br = movie.release_date
    ? `${movie.release_date.slice(8, 10)}/${movie.release_date.slice(5, 7)}/${movie.release_date.slice(0, 4)}`
    : "";

  return (
    <div className="movie-container">
      {movie.poster_path ? (
      <div className="movie-page-poster">
        <img
          className="movie-page-img"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={`poster de '${movie.title}'`}
        />
      </div>
        ) : (
      <div className="movie-page-poster-no-img">
        <img src={noImg} className="movie-page-no-img" alt="sem imagem"></img>
      </div>
        )}
      <div className="content-container">
      <h2 className="movie-page-title">{movie.title}</h2>
      <p className="movie-page-overview">{movie.overview}</p>
      {movie.release_date && <p className="movie-vote">Lançamento: {date_br}</p>}
      <p>Gênero: {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}</p>
      {movie.vote_average > 0 && <p className="movie-vote">Nota: {movie.vote_average}</p>}
      <p>Elenco:</p>
      <ul className="actor-list">
        {actors.map((actor) => (
        <ActorCard
        key={actor.id}
        id={actor.id}
        name={actor.name}
        profile_path={actor.profile_path}
        character={actor.character}
        />
        
      ))}   
      </ul>
      </div>
      </div>
  )
}

export default Movie