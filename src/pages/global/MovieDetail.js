import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import detailImg from "../../template/styles/main/img/section/details.jpg";
import coverImg from "../../template/styles/main/img/covers/cover1.jpg";
import MovieComment from "../../components/main/MovieComment";
import MovieReview from "../../components/main/MovieReview";
import MoviePhotos from "../../components/main/MoviePhotos";
import MovieSuggestion from "../../components/main/MovieSuggestion";

const MovieDetail = () => {
  return (
    <>
      <Helmet>
        <title>I Dream in Another Language</title>
      </Helmet>
      <section
        className="section section--details section--bg"
        data-bg={detailImg}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="section__title section__title--mb">
                I Dream in Another Language
              </h1>
            </div>
            <div className="col-12 col-xl-6">
              <div className="card card--details">
                <div className="row">
                  <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-5">
                    <div className="card__cover">
                      <img src={coverImg} alt="" />
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
                  </div>
                  <div className="col-12 col-md-8 col-lg-9 col-xl-7">
                    <div className="card__content">
                      <ul className="card__meta">
                        <li>
                          <span>Director:</span> Vince Gilligan
                        </li>
                        <li>
                          <span>Cast:</span> <Link to="/">Brian Cranston</Link>{" "}
                          <Link to="/">Jesse Plemons</Link>{" "}
                          <Link to="/">Matt Jones</Link>{" "}
                          <Link to="/">Jonathan Banks</Link>{" "}
                          <Link to="/">Charles Baker</Link>{" "}
                          <Link to="/">Tess Harper</Link>
                        </li>
                        <li>
                          <span>Genre:</span> <Link to="/">Action</Link>
                          <Link to="/">Triler</Link>
                        </li>
                        <li>
                          <span>Release year:</span> 2019
                        </li>
                        <li>
                          <span>Running time:</span> 130 min
                        </li>
                        <li>
                          <span>Country:</span> <Link to="/">USA</Link>
                        </li>
                      </ul>
                      <div className="card__description">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English. Many
                        desktop publishing packages and web page editors now use
                        Lorem Ipsum as their default model text, and a search
                        for 'lorem ipsum' will uncover many web sites still in
                        their infancy. The point of using Lorem Ipsum is that it
                        has a more-or-less normal distribution of letters, as
                        opposed to using 'Content here, content here', making it
                        look like readable English.
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
        </div>
      </section>
      <section className="content">
        <div className="content__head">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="content__title">Discover</h2>
                <ul
                  className="nav nav-tabs content__tabs"
                  id="content__tabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#tab-1"
                      role="tab"
                      aria-controls="tab-1"
                      aria-selected="true"
                    >
                      Comments
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tab-2"
                      role="tab"
                      aria-controls="tab-2"
                      aria-selected="false"
                    >
                      Reviews
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tab-3"
                      role="tab"
                      aria-controls="tab-3"
                      aria-selected="false"
                    >
                      Photos
                    </a>
                  </li>
                </ul>
                <div className="content__mobile-tabs" id="content__mobile-tabs">
                  {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
                  <div
                    className="content__mobile-tabs-btn dropdown-toggle"
                    role="navigation"
                    id="mobile-tabs"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <input type="button" value="Comments" />
                    <span></span>
                  </div>

                  <div
                    className="content__mobile-tabs-menu dropdown-menu"
                    aria-labelledby="mobile-tabs"
                  >
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="1-tab"
                          data-toggle="tab"
                          href="#tab-1"
                          role="tab"
                          aria-controls="tab-1"
                          aria-selected="true"
                        >
                          Comments
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="2-tab"
                          data-toggle="tab"
                          href="#tab-2"
                          role="tab"
                          aria-controls="tab-2"
                          aria-selected="false"
                        >
                          Reviews
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="3-tab"
                          data-toggle="tab"
                          href="#tab-3"
                          role="tab"
                          aria-controls="tab-3"
                          aria-selected="false"
                        >
                          Photos
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 col-xl-8">
              <div className="tab-content">
                <MovieComment />
                <MovieReview />
                <MoviePhotos />
              </div>
            </div>
            <div className="col-12 col-lg-4 col-xl-4">
              <MovieSuggestion />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetail;
