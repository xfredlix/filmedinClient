import React from 'react';
import FilmEntry from './FilmEntry';


var FilmList = ({handleFilmClick, allFilms, rating}) => (
  <div className="film-list">
    {allFilms.map((film, i) =>
      <FilmEntry
        key={i}
        handleFilmClick={handleFilmClick}
        film={film}
        rating={rating}
      /> )}
  </div>
)


export default FilmList;