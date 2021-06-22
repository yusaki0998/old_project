/** @format */

import React from "react";
import poster from "../../assets/poster.jpg";

const MovieSuggestion = () => {
  return (
    <div className="row row--grid">
      <div className="col-12">
        <h2 className="section__title section__title--sidebar">
          You may also like...
        </h2>
      </div>
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <div className="col-6 col-sm-4 col-lg-6" key={item}>
          <div className="card">
            <div className="card__cover">
              <img src={poster} alt="" />
              <a href="/" className="card__play">
                <i className="icon ion-ios-play"></i>
              </a>
              <span className="card__rate card__rate--green">8.4</span>
            </div>
            <div className="card__content">
              <h3 className="card__title">
                <a href="/">I Dream in Another Language</a>
              </h3>
              <span className="card__category">
                <a href="/">Action</a>
                <a href="/">Triler</a>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieSuggestion;
