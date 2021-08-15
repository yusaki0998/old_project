/** @format */

import React, { useEffect, useMemo, useState } from "react";
import MovieFiltered from "../../components/main/MovieFiltered";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  getListComingFilm,
  getListCurrentFilm,
} from "../../store/actions/managerActions";
import { parseCategories } from "../../utils/helper";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { comingFilm, currentFilm } = useSelector((state) => state.manager);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const { loginData } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (loginData?.data?.role === "admin") {
      history.push("/admin");
    }
    if (loginData?.data?.role === "manager") {
      history.push("/manager");
    }
    if (loginData?.data?.role === "staff") {
      history.push("/staff");
    }
  }, [history, loginData?.data?.role]);

  useEffect(() => {
    dispatch(getListCurrentFilm());
    dispatch(getListComingFilm());
  }, [dispatch]);

  const allFilm = useMemo(
    () => [...currentFilm.list, ...comingFilm.list],
    [comingFilm.list, currentFilm.list]
  );

  useEffect(() => {
    if (allFilm.length) {
      setFilteredMovies(allFilm);
    }
  }, [allFilm]);

  const genres = allFilm.map((film) => film?.genre);

  const categories = parseCategories(genres);

  const onFilterMovieByCategory = (category) => {
    if (category === "ALL") {
      setFilteredMovies(allFilm);
    } else {
      setFilteredMovies(allFilm.filter((item) => item.genre === category));
    }
  };

  return (
    <div className="mt-5 pt-3">
      <Helmet>
        <title> Trang chủ </title>
      </Helmet>
      <MovieFiltered
        isLoading={comingFilm.isLoading || currentFilm.isLoading}
        list={filteredMovies}
        categories={categories}
        filterMovie={onFilterMovieByCategory}
      />
    </div>
  );
};

export default HomePage;
