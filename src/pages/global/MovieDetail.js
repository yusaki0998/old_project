/** @format */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import MovieSuggestion from "../../components/main/MovieSuggestion";
import TopMovieDetail from "../../components/main/TopMovieDetail";
import { scrollToTop } from "../../utils/scrollToTopPos";
import { getFilmDetailRequest } from "../../store/api/global";
import { useHistory, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { getListSlotRequest } from "../../store/api/manager";
import { useDispatch, useSelector } from "react-redux";
import {
  globalGetListComingFilm,
  globalGetListCurrentFilm,
} from "../../store/actions/globalActions";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listSlot, setListSlot] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { comingFilm, currentFilm } = useSelector((state) => state.global);

  useEffect(() => {
    scrollToTop();
  }, []);

  const fetchMovieDetail = () => {
    setIsLoading(true);
    getFilmDetailRequest(id)
      .then(({ data }) => {
        setMovieDetail(data?.data?.movie);
      })
      .catch((err) => {
        console.log(err);
        history.goBack();
      })
      .finally(() => setIsLoading(false));
  };

  const fetchSlotList = () => {
    getListSlotRequest()
      .then(({ data }) => {
        setListSlot(data?.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMovieDetail();
    fetchSlotList();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (!isLoading && movieDetail?.status === 0) {
      dispatch(globalGetListComingFilm());
    }
    if (!isLoading && movieDetail?.status === 1) {
      dispatch(globalGetListCurrentFilm());
    }
  }, [dispatch, movieDetail?.status, isLoading]);

  return (
    <>
      <Helmet>
        <title> {movieDetail?.movieName || ""} </title>
      </Helmet>
      {isLoading && (
        <>
          <div className="mt-5 pt-5"></div>
          <LoadingSpinner />
        </>
      )}
      {!isLoading && movieDetail && (
        <>
          <section className="section section--details">
            <div className="container">
              <TopMovieDetail movieDetail={movieDetail} listSlot={listSlot} />
            </div>
          </section>
          <section className="content">
            <div className="container">
              <MovieSuggestion
                isLoading={
                  movieDetail?.status === 0
                    ? comingFilm.isLoading
                    : currentFilm.isLoading
                }
                list={
                  movieDetail?.status === 0 ? comingFilm.list : currentFilm.list
                }
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default MovieDetail;
