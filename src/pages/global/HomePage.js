/** @format */

import React from "react";
import PremiereMovies from "../../components/main/PremiereMovies";
import MovieFiltered from "../../components/main/MovieFiltered";

const HomePage = () => {
  return (
    <div className="mt-5 pt-3">
      <MovieFiltered isLoading={false} list={[]} />
      <PremiereMovies />
    </div>
  );
};

export default HomePage;
