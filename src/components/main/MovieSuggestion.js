import React from "react";
import coverBg from "../../template/styles/main/img/covers/cover.jpg";

const MovieSuggestion = () => {
  return (
    <div className="row row--grid">
      <div className="col-12">
        <h2 className="section__title section__title--sidebar">
          You may also like...
        </h2>
      </div>

      <div className="col-6 col-sm-4 col-lg-6">
        <div className="card">
          <div className="card__cover">
            <img src={coverBg} alt="" />
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
    </div>
  );
};

export default MovieSuggestion;
