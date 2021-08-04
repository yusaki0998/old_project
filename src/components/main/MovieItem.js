/** @format */

import React from "react";
import { Link } from "react-router-dom";
import poster from "../../assets/poster.jpg";
import { PROD_REST_API_IMG_URL } from "../../utils/constants";
import { showTotalTime } from "./TopMovieDetail";

export const getRatingColor = (rating) => {
  if (rating < 5) return "red";
  if (rating < 8) return "yellow";
  if (rating < 10) return "green";
};

const MovieItem = ({ movieItem, isStaff }) => {
  return (
    <div className="card card--big">
      <div className="card__cover">
        <Link
          to={
            isStaff
              ? `/staff/view-movie/${movieItem?._id}`
              : `/details/${movieItem?._id}?from=${movieItem?.status}`
          }
        >
          <img
            src={
              movieItem?.coverImage?.includes("cloudinary")
                ? movieItem?.coverImage
                : !movieItem?.coverImage
                ? `${PROD_REST_API_IMG_URL}/${movieItem?.coverImage}`
                : poster
            }
            alt={movieItem?.movieName}
          />
        </Link>
      </div>
      <div className="card__content">
        <h3 className="card__title card__title-movie">
          <Link
            to={
              isStaff
                ? `/staff/view-movie/${movieItem?._id}`
                : `/details/${movieItem?._id}?from=${movieItem?.status}`
            }
          >
            {movieItem?.movieName}
          </Link>
        </h3>
        <p>
          <strong className="text-white">Thể loại : </strong>
          <span className="card__category">{movieItem?.genre}</span>
        </p>
        <p className="text-white f-14 mt-1">
          <strong className="text-white">Thời lượng : </strong>{" "}
          {showTotalTime(movieItem?.amountOfTime)}
        </p>
        <p className="text-white f-14 mt-1">
          <strong className="text-white">Khởi chiếu : </strong>{" "}
          {movieItem?.showtimes?.substr(0, 10)}
        </p>
      </div>
    </div>
  );
};

export default MovieItem;
