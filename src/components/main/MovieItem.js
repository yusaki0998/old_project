/** @format */

import React from "react";
import { Link } from "react-router-dom";
import poster from "../../assets/poster.jpg";
import { PROD_REST_API_IMG_URL } from "../../utils/constants";
import { showTotalTime } from "./TopMovieDetail";

const MovieItem = ({ movieItem }) => {
  return (
    <div className="card card--big">
      <div className="card__cover">
        <img
          src={
            !movieItem?.coverImage
              ? `${PROD_REST_API_IMG_URL}/${movieItem?.coverImage}`
              : poster
          }
          alt={movieItem?.movieName}
        />
        <Link to={`/details/${movieItem?._id}`} className="card__play">
          <i className="icon ion-ios-play"></i>
        </Link>
        <span className="card__rate card__rate--green">8.4</span>
      </div>
      <div className="card__content">
        <h3 className="card__title card__title-movie">
          <Link to={`/details/${movieItem?._id}`}>{movieItem?.movieName}</Link>
        </h3>
        <span className="card__category">{movieItem?.genre}</span>
        <p className="text-white f-14 mt-1">
          {showTotalTime(movieItem?.amountOfTime)}
        </p>
      </div>
    </div>
  );
};

export default MovieItem;
