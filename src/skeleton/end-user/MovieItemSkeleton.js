/** @format */
import React from "react";
import Skeleton from "react-loading-skeleton";
import { checkCondition } from "../../utils/helper";

const MovieItemSkeleton = ({ filmItemClassName }) => {
  return (
    <div
      className={`col-6 col-sm-4 col-md-3 col-xl-2 ${checkCondition(
        filmItemClassName,
        filmItemClassName,
        "col-xl-2"
      )}`}
    >
      <div className="card card--big">
        <div className="card__cover">
          <Skeleton width={window.innerWidth > 1366 ? 190 : 155} height={282} />
        </div>
        <div className="card__content">
          <h3 className="card__title">
            <Skeleton width={window.innerWidth > 1366 ? 190 : 155} />
          </h3>
          <span className="card__category">
            <Skeleton width={50} className="mr-2" />
            <Skeleton width={50} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieItemSkeleton;
