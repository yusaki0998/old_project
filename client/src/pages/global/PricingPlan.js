import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import PricePlan from "../../components/main/PricePlan";
import Partners from "../../components/shared/Partners";
import sectionBg from "../../template/styles/main/img/section/section.jpg";
import { scrollToTop } from "../../utils/scrollToTopPos";

const PricingPlan = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <Helmet>
        <title>Hotflix Pricing Plan</title>
      </Helmet>
      <section
        className="section section--first section--bg"
        data-bg={sectionBg}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__wrap">
                <h2 className="section__title">Pricing plan</h2>

                <ul className="breadcrumb">
                  <li className="breadcrumb__item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb__item breadcrumb__item--active">
                    Pricing plan
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PricePlan hideTitle />
      <section className="section section--border">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section__title section__title--mb0">
                Our Features
              </h2>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="feature">
                <i className="icon ion-ios-tv feature__icon"></i>
                <h3 className="feature__title">Ultra HD</h3>
                <p className="feature__text">
                  If you are going to use a passage of Lorem Ipsum, you need to
                  be sure there isn't anything embarrassing hidden in the middle
                  of text.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="feature">
                <i className="icon ion-ios-film feature__icon"></i>
                <h3 className="feature__title">Film</h3>
                <p className="feature__text">
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary, making this the first.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="feature">
                <i className="icon ion-ios-trophy feature__icon"></i>
                <h3 className="feature__title">Awards</h3>
                <p className="feature__text">
                  It to make a type specimen book. It has survived not only five
                  centuries, but also the leap into electronic typesetting,
                  remaining.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="feature">
                <i className="icon ion-ios-notifications feature__icon"></i>
                <h3 className="feature__title">Notifications</h3>
                <p className="feature__text">
                  Various versions have evolved over the years, sometimes by
                  accident, sometimes on purpose.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="feature">
                <i className="icon ion-ios-rocket feature__icon"></i>
                <h3 className="feature__title">Rocket</h3>
                <p className="feature__text">
                  It to make a type specimen book. It has survived not only five
                  centuries, but also the leap into electronic typesetting.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="feature">
                <i className="icon ion-ios-globe feature__icon"></i>
                <h3 className="feature__title">Multi Language Subtitles </h3>
                <p className="feature__text">
                  Various versions have evolved over the years, sometimes by
                  accident, sometimes on purpose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Partners />
    </>
  );
};

export default PricingPlan;
