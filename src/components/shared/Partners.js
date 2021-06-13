import React from "react";
import { Link } from "react-router-dom";
import doceanBg from "../../template/styles/main/img/partners/3docean-light-background.png";
import activenBg from "../../template/styles/main/img/partners/activeden-light-background.png";
import audioJunglenBg from "../../template/styles/main/img/partners/audiojungle-light-background.png";
import codeCanyonBg from "../../template/styles/main/img/partners/codecanyon-light-background.png";
import photoDuneBg from "../../template/styles/main/img/partners/photodune-light-background.png";
import themeforestBg from "../../template/styles/main/img/partners/themeforest-light-background.png";

const Partners = () => {
  return (
    <section className="section section--border">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="section__title section__title--mb">Our Partners</h2>
          </div>

          <div className="col-12">
            <p className="section__text">
              It is a long <b>established</b> fact that a reader will be
              distracted by the readable content of a page when looking at its
              layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using.
            </p>
          </div>

          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <Link to="/" className="partner">
              <img src={themeforestBg} alt="" className="partner__img" />
            </Link>
          </div>

          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <Link to="/" className="partner">
              <img src={audioJunglenBg} alt="" className="partner__img" />
            </Link>
          </div>

          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <Link to="/" className="partner">
              <img src={codeCanyonBg} alt="" className="partner__img" />
            </Link>
          </div>

          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <Link to="/" className="partner">
              <img src={photoDuneBg} alt="" className="partner__img" />
            </Link>
          </div>

          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <Link to="/" className="partner">
              <img src={activenBg} alt="" className="partner__img" />
            </Link>
          </div>

          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <Link to="/" className="partner">
              <img src={doceanBg} alt="" className="partner__img" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
