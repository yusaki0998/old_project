/** @format */

import React from "react";
import MovieItem from "./MovieItem";
import MovieListSkeleton from "../../skeleton/end-user/MovieListSkeleton";

const MovieFiltered = ({ isLoading, list, hideFiltered }) => {
  return (
    <section className="content">
      {!hideFiltered && (
        <div className="content__head">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="content__title mt-3">Thể loại</h2>
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
                      NEW RELEASES
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
                      MOVIES
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
                      TV SERIES
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tab-4"
                      role="tab"
                      aria-controls="tab-4"
                      aria-selected="false"
                    >
                      CARTOONS
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
                    <input type="button" value="New releases" />
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
                          NEW RELEASES
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
                          MOVIES
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
                          TV SERIES
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="4-tab"
                          data-toggle="tab"
                          href="#tab-4"
                          role="tab"
                          aria-controls="tab-4"
                          aria-selected="false"
                        >
                          CARTOONS
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="tab-1"
            role="tabpanel"
            aria-labelledby="1-tab"
          >
            {isLoading && <MovieListSkeleton />}
            <div className="row row--grid">
              {!isLoading &&
                list?.map((item) => (
                  <div
                    className="col-6 col-sm-4 col-md-3 col-xl-2"
                    key={item._id}
                  >
                    <MovieItem movieItem={item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieFiltered;
