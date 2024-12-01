import PropTypes from "prop-types"

import "./ActorCard.css"

const ActorCard = (props) => {
  return (
    <li key={props.id} className="actor-card"> 
        <div className="actor-poster">
            <img
            className="actor-img"
            src={`https://image.tmdb.org/t/p/original${props.profile_path}`}
            alt={`sem foto para '${props.name}'`}
            />
        </div> 
        <p className="actor-name">{props.name}</p>
        <p className="actor-character">"{props.character}"</p>
    </li>  
  )
}

ActorCard.propTypes = {
    name: PropTypes.string.isRequired,
    profile_path: PropTypes.string,
    character: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  };

export default ActorCard