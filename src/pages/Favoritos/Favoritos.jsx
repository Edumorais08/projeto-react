import React from "react";
import { useFavorites } from "../../context/FavoriteContext";
import MovieCard from "../../components/MovieCard/MovieCard";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div>
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
        <p><center>Você ainda não adicionou nenhum filme aos favoritos.</center></p>
      )}
    </div>
  );
};

export default Favorites;
