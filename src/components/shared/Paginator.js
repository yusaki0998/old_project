/** @format */

import React from "react";
import { MAX_ITEMS_PER_PAGE } from "../../pages/manager/FilmRoom";

const Paginator = ({ maxPage, curPage, setCurPage, totalItems }) => {
  if (!maxPage || maxPage <= 1) {
    return null;
  }
  return (
    <div className="paginator-wrap">
      <span>
        {MAX_ITEMS_PER_PAGE} from {totalItems}
      </span>
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
          <button onClick={() => setCurPage((prevState) => prevState - 1)}>
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
              <button onClick={() => setCurPage(index)}> {index + 1} </button>
            </li>
          ))}
        <li
          className={`paginator__item paginator__item--next ${
            curPage === maxPage - 1 ? "divDisable" : ""
          }`}
        >
          <button onClick={() => setCurPage((prevState) => prevState + 1)}>
            <i className="icon ion-ios-arrow-forward"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Paginator;
