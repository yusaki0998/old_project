import React from "react";
import { Link } from "react-router-dom";

const PricePlan = ({ hideTitle }) => {
  return (
    <section className="section section--border">
      <div className="container">
        {!hideTitle && (
          <div className="row">
            <div className="col-12 col-xl-10">
              <h2 className="section__title section__title--mb">
                <b>HotFlix</b> – Best Place for Movies
              </h2>

              <p className="section__text">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of <b>using Lorem</b> Ipsum is that it has a
                more-or-less normal distribution of letters, as opposed to
                using. Many desktop publishing packages and web page editors now
                use Lorem Ipsum as their default model text, and a search for
                'lorem ipsum' will uncover many web sites still in their
                infancy.
              </p>

              <p className="section__text">
                Content here, content here, making it look like{" "}
                <Link to="/">readable</Link> English. Many desktop publishing
                packages and web page editors now use Lorem Ipsum as their
                default model text, and a search for 'lorem ipsum' will uncover
                many web sites still in their infancy. Various versions have
                evolved over the years, sometimes by accident, sometimes on
                purpose (injected humour and the like).
              </p>
            </div>
          </div>
        )}

        <div className="row row--grid">
          <div className="col-12 col-md-6 col-lg-4 order-md-2 order-lg-1">
            <div className="price">
              <div className="price__item price__item--first">
                <span>Basic</span> <span>Free</span>
              </div>
              <div className="price__item">
                <span>
                  <i className="icon ion-ios-checkmark"></i> 7 days
                </span>
              </div>
              <div className="price__item">
                <span>
                  <i className="icon ion-ios-checkmark"></i> 720p Resolution
                </span>
              </div>
              <div className="price__item price__item--none">
                <span>
                  <i className="icon ion-ios-close"></i> Limited Availability
                </span>
              </div>
              <div className="price__item price__item--none">
                <span>
                  <i className="icon ion-ios-close"></i> Desktop Only
                </span>
              </div>
              <div className="price__item price__item--none">
                <span>
                  <i className="icon ion-ios-close"></i> Limited Support
                </span>
              </div>
              <Link to="/" className="price__btn">
                Choose Plan
              </Link>
            </div>
          </div>

          <div className="col-12 col-md-12 col-lg-4 order-md-1 order-lg-2">
            <div className="price price--premium">
              <div className="price__item price__item--first">
                <span>Premium</span>{" "}
                <span>
                  $34.99 <sub>/ month</sub>
                </span>
              </div>
              <div className="price__item">
                <span>
                  <i className="icon ion-ios-checkmark"></i> 1 Month
                </span>
              </div>
              <div className="price__item">
                <span>
                  <i className="icon ion-ios-checkmark"></i> Full HD
                </span>
              </div>
              <div className="price__item">
                <span>
                  <i className="icon ion-ios-checkmark"></i> Lifetime
                  Availability
                </span>
              </div>
              <div className="price__item price__item--none">
                <span>
                  <i className="icon ion-ios-close"></i> TV & Desktop
                </span>
              </div>
              <div className="price__item price__item--none">
                <span>
                  <i className="icon ion-ios-close"></i> 24/7 Support
                </span>
              </div>
              <Link to="/" className="price__btn">
                Choose Plan
              </Link>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4 order-md-3">
            <div className="price">
              <div className="price__item price__item--first">
                <span>Cinematic</span>{" "}
                <span>
                  $49.99 <sub>/ month</sub>
                </span>
              </div>
              <div className="price__item">
                <span>
                  <i className="icon ion-ios-checkmark"></i> 2 Months
                </span>
              </div>
              <div className="price__item">
                <span>
                  <i className="icon ion-ios-checkmark"></i> Ultra HD
                </span>
              </div>
              <div className="price__item">
                <span>
                  <i className="icon ion-ios-checkmark"></i> Lifetime
                  Availability
                </span>
              </div>
              <div className="price__item">
                <span>
                  <i className="icon ion-ios-checkmark"></i> Any Device
                </span>
              </div>
              <div className="price__item">
                <span>
                  <i className="icon ion-ios-checkmark"></i> 24/7 Support
                </span>
              </div>
              <Link to="/" className="price__btn">
                Choose Plan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricePlan;
