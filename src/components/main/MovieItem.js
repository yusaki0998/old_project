import React from "react";
import { Link } from "react-router-dom";
import coverBg from "../../template/styles/main/img/covers/cover.jpg";

const MovieItem = ({ movieItem }) => {
  return (
    <div className="card card--big">
      <div className="card__cover">
        <img src={coverBg} alt="" />
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
          <a href="/">Action</a>
          <a href="/">Triler</a>
        </span>
      </div>
    </div>
  );
};

export default MovieItem;
