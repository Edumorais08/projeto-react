import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoriteContext";

import noImg from "../../assets/no-img.png";
import "./MovieCard.css";

const MovieCard = (props) => {
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const date = props.release_date;
  const date_br =
    date[8] +
    date[9] +
    "/" +
    date[5] +
    date[6] +
    "/" +
    date[0] +
    date[1] +
    date[2] +
    date[3];

  const isFavorite = favorites.some((fav) => fav.id === props.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(props.id);
    } else {
      addFavorite({
        id: props.id,
        title: props.title,
        poster_path: props.poster_path,
        release_date: props.release_date,
      });
    }
  };

  return (
    <li className="movie-card">
      <Link to={`/movie/${props.id}`} className="movie-link">
        {props.poster_path ? (
          <div className="movie-poster">
            <img
              className="poster-img"
              src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
              alt={`poster de '${props.title}'`}
            />
          </div>
        ) : (
          <div className="poster-no-img">
            <img src={noImg} className="no-img" alt="sem imagem" />
          </div>
        )}
      </Link>
  
      <div className="movie-info">
        <p className="movie-title">{props.title}</p>
        <p className="movie-date">Lançamento: {date_br}</p>
        <button
          onClick={handleFavoriteClick}
          className={`favorite-btn ${isFavorite ? "is-favorite" : ""}`}
        >
          {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        </button>
      </div>
    </li>
  );  
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
  release_date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default MovieCard;
