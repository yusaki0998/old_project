/** @format */

import React from "react";
// import homeBg from "../../template/styles/main/img/home/home__bg.jpg";
// import homeBg2 from "../../template/styles/main/img/home/home__bg2.jpg";
// import homeBg3 from "../../template/styles/main/img/home/home__bg3.jpg";
// import homeBg4 from "../../template/styles/main/img/home/home__bg4.jpg";
// import homeBg5 from "../../template/styles/main/img/home/home__bg5.jpg";
import banner from "../../assets/banner.jpg";
import NewMovie from "../../components/main/NewMovie";
import PricePlan from "../../components/main/PricePlan";
import PremiereMovies from "../../components/main/PremiereMovies";
import MovieFiltered from "../../components/main/MovieFiltered";

const HomePage = () => {
  return (
    <>
      <section className="home">
        <div className="owl-carousel home__bg">
          <div className="item home__cover" data-bg={banner}></div>
          <div className="item home__cover" data-bg={banner}></div>
          <div className="item home__cover" data-bg={banner}></div>
          <div className="item home__cover" data-bg={banner}></div>
          <div className="item home__cover" data-bg={banner}></div>
        </div>
        <div className="container">
          <NewMovie />
        </div>
      </section>
      <MovieFiltered />
      <PremiereMovies />
      <PricePlan />
    </>
  );
};

export default HomePage;
