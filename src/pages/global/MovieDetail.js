/** @format */

import React from "react";
import { Helmet } from "react-helmet";
import MovieComment from "../../components/main/MovieComment";
import MovieReview from "../../components/main/MovieReview";
import MoviePhotos from "../../components/main/MoviePhotos";
import MovieSuggestion from "../../components/main/MovieSuggestion";
import TopMovieDetail from "../../components/main/TopMovieDetail";
import MovieDetailNav from "../../components/main/MovieDetailNav";

const MovieDetail = () => {
  return (
    <>
      <Helmet>
        <title>I Dream in Another Language</title>
      </Helmet>
      <section className="section section--details">
        <div className="container">
          <TopMovieDetail />
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
                <MovieComment />
                <MovieReview />
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
  );
};

export default MovieDetail;
