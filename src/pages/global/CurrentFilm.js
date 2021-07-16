/** @format */

import React, { useEffect } from "react";
import MovieFiltered from "../../components/main/MovieFiltered";
import { useDispatch, useSelector } from "react-redux";
import { globalGetListCurrentFilm } from "../../store/actions/globalActions";
import { Helmet } from "react-helmet";

const CurrentFilm = () => {
  const dispatch = useDispatch();
  const { currentFilm } = useSelector((state) => state.global);

  useEffect(() => {
    dispatch(globalGetListCurrentFilm());
  }, [dispatch]);

  return (
    <div className="mt-5 pt-3">
      <Helmet>
        <title> Phim đang chiếu </title>
      </Helmet>
      <MovieFiltered
        isLoading={currentFilm.isLoading}
        list={currentFilm.list}
      />
    </div>
  );
};

export default CurrentFilm;
