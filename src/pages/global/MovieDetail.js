/** @format */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import MoviePhotos from "../../components/main/MoviePhotos";
import MovieSuggestion from "../../components/main/MovieSuggestion";
import TopMovieDetail from "../../components/main/TopMovieDetail";
import MovieDetailNav from "../../components/main/MovieDetailNav";
import { scrollToTop } from "../../utils/scrollToTopPos";
import { getFilmDetailRequest } from "../../store/api/global";
import { useHistory, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    scrollToTop();
  }, []);

  const fetchMovieDetail = () => {
    setIsLoading(true);
    getFilmDetailRequest(id)
      .then(({ data }) => {
        setMovieDetail(data?.data);
      })
      .catch((err) => {
        console.log(err);
        history.goBack();
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchMovieDetail();
    // eslint-disable-next-line
  }, [id]);

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
              <TopMovieDetail movieDetail={movieDetail} />
            </div>
          </section>
          <section className="content">
            <div className="content__head">
              <div className="container">
                <MovieDetailNav />
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-8 col-xl-8">
                  <div className="tab-content">
                    <MoviePhotos />
                  </div>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <MovieSuggestion />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default MovieDetail;
