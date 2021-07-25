/** @format */

import React from "react";

const Paginator = ({
  maxPage,
  curPage,
  setCurPage,
  totalItems,
  isLoading,
  scrollAfterClicking,
}) => {
  if (isLoading) {
    return null;
  }
  if (!maxPage || maxPage <= 1) {
    return null;
  }
  return (
    <div className="paginator-wrap">
      <ul
        className="paginator c__paginator"
        style={{
          width: "fit-content !important",
        }}
      >
        <li
          className={`paginator__item paginator__item--prev ${
            curPage === 0 ? "divDisable" : ""
          }`}
        >
          <button
            onClick={() => {
              setCurPage((prevState) => prevState - 1);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <i className="icon ion-ios-arrow-back"></i>
          </button>
        </li>
        {Array(maxPage)
          .fill(1)
          .map((_, index) => (
            <li
              key={index}
              className={`paginator__item ${
                curPage === index ? "paginator__item--active" : ""
              }`}
            >
              <button
                onClick={() => {
                  setCurPage(index);
                  if (scrollAfterClicking) {
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {" "}
                {index + 1}{" "}
              </button>
            </li>
          ))}
        <li
          className={`paginator__item paginator__item--next ${
            curPage === maxPage - 1 ? "divDisable" : ""
          }`}
        >
          <button
            onClick={() => {
              setCurPage((prevState) => prevState + 1);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <i className="icon ion-ios-arrow-forward"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Paginator;
