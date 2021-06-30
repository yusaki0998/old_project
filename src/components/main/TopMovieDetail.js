/** @format */

import React from "react";
import { Link } from "react-router-dom";
import poster from "../../assets/poster.jpg";
import { justContainNumber } from "../../utils/helper";

const TopMovieDetail = ({ movieDetail }) => {
  const showTotalTime = (time) => {
    if (!time) {
      return "";
    }
    if (justContainNumber(time)) {
      return `${time} minutes`;
    }
    return time;
  };

  return (
    <div className="row">
      <div className="col-12">
        <h1 className="section__title section__title--mb">
          {movieDetail.movieName}
        </h1>
      </div>
      <div className="col-12 col-xl-6">
        <div className="card card--details">
          <div className="row">
            <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-5">
              <div className="card__cover">
                <img src={poster} alt="poster" />
                <span className="card__rate card__rate--green">8.4</span>
              </div>
              <a
                href="http://www.youtube.com/watch?v=0O2aH4XLbto"
                className="card__trailer"
                target="_blank"
                rel="noreferrer"
              >
                <i className="icon ion-ios-play-circle"></i> Watch trailer
              </a>
              <button className="card__trailer">
                <i className="icon ion-ios-cart"></i> Mua vé
              </button>
            </div>
            <div className="col-12 col-md-8 col-lg-9 col-xl-7">
              <div className="card__content">
                <ul className="card__meta">
                  <li>
                    <span>Director:</span> {movieDetail?.director}
                  </li>
                  <li>
                    <span>Cast : </span>
                    {movieDetail?.actor?.split(", ").map((name, index) => (
                      <Link to="/" key={index}>
                        {name}
                      </Link>
                    ))}
                  </li>
                  <li>
                    <span>Genre:</span>
                    <Link to="/"> {movieDetail?.genre} </Link>
                  </li>
                  <li>
                    <span>Release year:</span>
                    {movieDetail?.showtimes?.toString()?.substr(0, 4)}
                  </li>
                  <li>
                    <span>Running time:</span>{" "}
                    {showTotalTime(movieDetail?.amountOfTime)}
                  </li>
                  <li>
                    <span>Country:</span>
                    <Link to="/"> {movieDetail?.nation} </Link>
                  </li>
                </ul>
                <div className="card__description">
                  {movieDetail?.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-xl-6">
        <video
          controls
          crossOrigin="true"
          playsInline
          poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
          id="player"
          style={{
            width: "100%",
          }}
        >
          <source
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
            type="video/mp4"
            size="576"
          />
          <source
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
            type="video/mp4"
            size="720"
          />
          <source
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
            type="video/mp4"
            size="1080"
          />

          <track
            kind="captions"
            label="English"
            srcLang="en"
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
            default
          />
          <track
            kind="captions"
            label="Français"
            srcLang="fr"
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
          />

          <a
            href="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
            download
          >
            Download
          </a>
        </video>
      </div>
    </div>
  );
};

export default TopMovieDetail;
