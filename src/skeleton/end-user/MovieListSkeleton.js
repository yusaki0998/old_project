/** @format */

import React from "react";
import MovieItemSkeleton from "./MovieItemSkeleton";

const MovieListSkeleton = ({ filmItemClassName }) => {
  return (
    <div className="row row--grid">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
        <MovieItemSkeleton key={item} filmItemClassName={filmItemClassName} />
      ))}
    </div>
  );
};

export default MovieListSkeleton;
