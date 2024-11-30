import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./MovieCard.css"

const MovieCard = (props) => {

    const date = props.release_date
    const date_br = date[8] + date[9] + '/' + date[5] + date[6] + '/' + date[0] + date [1] + date [2] + date[3]

  return (
    <Link to="/" className="movie-link">
        <li className="movie-card" >
            <div className="movie-poster">
                <img 
                src={`https://image.tmdb.org/t/p/original${props.poster_path}`} 
                alt={`poster de ' ${props.title} '`}> 
                </img>
            </div>
            <p className="movie-title"> {props.title} </p>
            <p className="movie-date"> Lançamento: {date_br} </p>
        </li>
    </Link>
  )
}

MovieCard.propTypes = {
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
  };

export default MovieCard