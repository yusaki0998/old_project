/** @format */

import React from "react";
import { Link } from "react-router-dom";
import poster from "../../assets/poster.jpg";

const SmallMovieItem = () => {
  return (
    <div className="card">
      <div className="card__cover">
        <img src={poster} alt="poster" />
        <Link to="/details/1" className="card__play">
          <i className="icon ion-ios-play"></i>
        </Link>
        <span className="card__rate card__rate--green">8.4</span>
      </div>
      <div className="card__content">
        <h3 className="card__title">
          <Link to="/details/1">I Dream in Another Language</Link>
        </h3>
        <span className="card__category">
          <Link to="/">Action</Link>
          <Link to="/">Triler</Link>
        </span>
      </div>
    </div>
  );
};

export default SmallMovieItem;
