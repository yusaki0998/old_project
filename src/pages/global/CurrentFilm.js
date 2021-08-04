/** @format */

import React, { useEffect, useState } from "react";
import MovieFiltered from "../../components/main/MovieFiltered";
import { useDispatch, useSelector } from "react-redux";
import { globalGetListCurrentFilm } from "../../store/actions/globalActions";
import { Helmet } from "react-helmet";
import { parseCategories } from "../../utils/helper";

const CurrentFilm = () => {
  const dispatch = useDispatch();
  const { currentFilm } = useSelector((state) => state.global);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    dispatch(globalGetListCurrentFilm());
  }, [dispatch]);

  useEffect(() => {
    if (currentFilm.list.length) {
      setFilteredMovies(currentFilm.list);
    }
  }, [currentFilm.list]);

  const genres = currentFilm.list.map((film) => film?.genre);

  const categories = parseCategories(genres);

  const onFilterMovieByCategory = (category) => {
    if (category === "ALL") {
      setFilteredMovies(currentFilm.list);
    } else {
      setFilteredMovies(
        currentFilm.list.filter((item) => item.genre === category)
      );
    }
  };

  return (
    <div className="mt-5 pt-3">
      <Helmet>
        <title> Phim đang chiếu </title>
      </Helmet>
      <MovieFiltered
        isLoading={currentFilm.isLoading}
        list={filteredMovies}
        categories={categories}
        filterMovie={onFilterMovieByCategory}
      />
    </div>
  );
};

export default CurrentFilm;
