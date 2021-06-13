import React from "react";
import { Link } from "react-router-dom";
import SmallMovieItem from "./SmallMovieItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 1,
      },
    },
  ],
};

const PremiereMovies = () => {
  return (
    <section className="section section--border section__premier-list">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section__title-wrap">
              <h2 className="section__title">Expected premiere</h2>
              <div className="section__nav-wrap">
                <Link to="/catalog" className="section__view">
                  View All
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12">
            <Slider {...settings}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <SmallMovieItem key={item} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiereMovies;
