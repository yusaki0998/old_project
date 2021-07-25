/** @format */

import React from "react";
import MovieFiltered from "./MovieFiltered";

const MovieSuggestion = ({ isLoading, list }) => {
  return (
    <div className="">
      <div className="col-12">
        <h2 className="section__title section__title--sidebar mt-5">
          Có thể bạn thích
        </h2>
      </div>
      <MovieFiltered isLoading={isLoading} list={list} hideFiltered />
    </div>
  );
};

export default MovieSuggestion;
