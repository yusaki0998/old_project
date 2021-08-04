/** @format */

import React, { useEffect, useState } from "react";
import MovieFiltered from "../../components/main/MovieFiltered";
import { useDispatch, useSelector } from "react-redux";
import { globalGetListComingFilm } from "../../store/actions/globalActions";
import { Helmet } from "react-helmet";
import { parseCategories } from "../../utils/helper";

const ComingFilm = () => {
  const dispatch = useDispatch();
  const { comingFilm } = useSelector((state) => state.global);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    dispatch(globalGetListComingFilm());
  }, [dispatch]);

  useEffect(() => {
    if (comingFilm.list.length) {
      setFilteredMovies(comingFilm.list);
    }
  }, [comingFilm.list]);

  const genres = comingFilm.list.map((film) => film?.genre);

  const categories = parseCategories(genres);

  const onFilterMovieByCategory = (category) => {
    if (category === "ALL") {
      setFilteredMovies(comingFilm.list);
    } else {
      setFilteredMovies(
        comingFilm.list.filter((item) => item.genre === category)
      );
    }
  };

  return (
    <div className="mt-5 pt-3">
      <Helmet>
        <title> Phim sắp chiếu </title>
      </Helmet>
      <MovieFiltered
        isLoading={comingFilm.isLoading}
        list={filteredMovies}
        categories={categories}
        filterMovie={onFilterMovieByCategory}
      />
    </div>
  );
};

export default ComingFilm;
