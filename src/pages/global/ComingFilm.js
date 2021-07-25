/** @format */

import React, { useEffect } from "react";
import MovieFiltered from "../../components/main/MovieFiltered";
import { useDispatch, useSelector } from "react-redux";
import { globalGetListComingFilm } from "../../store/actions/globalActions";
import { Helmet } from "react-helmet";

const ComingFilm = () => {
  const dispatch = useDispatch();
  const { comingFilm } = useSelector((state) => state.global);

  useEffect(() => {
    dispatch(globalGetListComingFilm());
  }, [dispatch]);

  return (
    <div className="mt-5 pt-3">
      <Helmet>
        <title> Phim sắp chiếu </title>
      </Helmet>
      <MovieFiltered isLoading={comingFilm.isLoading} list={comingFilm.list} />
    </div>
  );
};

export default ComingFilm;
