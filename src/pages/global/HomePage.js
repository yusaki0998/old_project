/** @format */

import React, { useEffect } from "react";
import MovieFiltered from "../../components/main/MovieFiltered";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  getListComingFilm,
  getListCurrentFilm,
} from "../../store/actions/managerActions";

const HomePage = () => {
  const dispatch = useDispatch();
  const { comingFilm, currentFilm } = useSelector((state) => state.manager);

  useEffect(() => {
    dispatch(getListCurrentFilm());
    dispatch(getListComingFilm());
  }, [dispatch]);

  const allFilm = [...comingFilm.list, ...currentFilm.list];

  return (
    <div className="mt-5 pt-3">
      <Helmet>
        <title> Trang chủ </title>
      </Helmet>
      <MovieFiltered
        isLoading={comingFilm.isLoading || currentFilm.isLoading}
        list={allFilm}
      />
    </div>
  );
};

export default HomePage;
