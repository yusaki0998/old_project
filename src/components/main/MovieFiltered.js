/** @format */

import React from "react";
import MovieItem from "./MovieItem";
import MovieListSkeleton from "../../skeleton/end-user/MovieListSkeleton";

const MovieFiltered = ({
  isLoading,
  list,
  hideFiltered,
  filmItemClassName,
  categories,
  filterMovie,
  isStaff,
}) => {
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
                      className="nav-link"
                      data-toggle="tab"
                      href={`#tab-0`}
                      role="tab"
                      aria-controls={`tab-0`}
                      aria-selected="true"
                      onClick={() => filterMovie("ALL")}
                    >
                      Tất cả
                    </a>
                  </li>
                  {categories?.map((cate, index) => (
                    <li
                      className="nav-item"
                      key={cate}
                      onClick={() => filterMovie(cate)}
                    >
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href={`#tab-${index + 1}`}
                        role="tab"
                        aria-controls={`tab-${index + 1}`}
                        aria-selected="true"
                      >
                        {cate}
                      </a>
                    </li>
                  ))}
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
                    style={{
                      height: "auto !important",
                      maxHeight: "auto !important",
                    }}
                  >
                    <input type="button" value="Please choose" />
                    <span></span>
                  </div>
                  <div
                    className="content__mobile-tabs-menu dropdown-menu"
                    aria-labelledby="mobile-tabs"
                  >
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href={`#tab-0`}
                          role="tab"
                          aria-controls={`tab-0`}
                          aria-selected="true"
                          onClick={() => filterMovie("ALL")}
                        >
                          Tất cả
                        </a>
                      </li>
                      {categories?.map((cate, index) => (
                        <li
                          className="nav-item"
                          key={cate}
                          onClick={() => filterMovie(cate)}
                        >
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href={`#tab-${index + 1}`}
                            role="tab"
                            aria-controls={`tab-${index + 1}`}
                            aria-selected="true"
                          >
                            {cate}
                          </a>
                        </li>
                      ))}
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
            {isLoading && (
              <MovieListSkeleton filmItemClassName={filmItemClassName} />
            )}
            <div className="row row--grid">
              {!isLoading &&
                list?.map((item) => (
                  <div
                    className={`col-6 col-sm-4 col-md-3 ${
                      filmItemClassName ? filmItemClassName : "col-xl-2"
                    }`}
                    key={item._id}
                  >
                    <MovieItem movieItem={item} isStaff={isStaff} />
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
