import React from "react";
import MovieList from "./MovieList";

const NewMovie = () => {
  return (
    <div className="row">
      <div className="col-12 mt-5">
        <h1 className="home__title">
          <b>NEW ITEMS</b> OF THIS SEASON
        </h1>
      </div>
      <div className="col-12">
        <MovieList movieList={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
      </div>
    </div>
  );
};

export default NewMovie;
