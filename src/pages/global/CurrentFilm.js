/** @format */

import React, { useEffect } from "react";
import MovieFiltered from "../../components/main/MovieFiltered";
import { useDispatch, useSelector } from "react-redux";
import { globalGetListCurrentFilm } from "../../store/actions/globalActions";

const CurrentFilm = () => {
  const dispatch = useDispatch();
  const { currentFilm } = useSelector((state) => state.global);

  useEffect(() => {
    dispatch(globalGetListCurrentFilm());
  }, [dispatch]);

  return (
    <div className="mt-5 pt-3">
      <MovieFiltered
        isLoading={currentFilm.isLoading}
        list={currentFilm.list}
      />
    </div>
  );
};

export default CurrentFilm;
