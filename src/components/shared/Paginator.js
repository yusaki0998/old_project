import React from "react";
import { Link } from "react-router-dom";

const Paginator = () => {
  return (
    <div className="paginator-wrap">
      <span>10 from 14 452</span>
      <ul
        className="paginator c__paginator"
        style={{
          width: "fit-content !important",
        }}
      >
        <li className="paginator__item paginator__item--prev">
          <Link to="/">
            <i className="icon ion-ios-arrow-back"></i>
          </Link>
        </li>
        <li className="paginator__item">
          <Link to="/">1</Link>
        </li>
        <li className="paginator__item paginator__item--active">
          <Link to="/">2</Link>
        </li>
        <li className="paginator__item">
          <Link to="/">3</Link>
        </li>
        <li className="paginator__item">
          <Link to="/">4</Link>
        </li>
        <li className="paginator__item paginator__item--next">
          <Link to="/">
            <i className="icon ion-ios-arrow-forward"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Paginator;
