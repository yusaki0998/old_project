import React from "react";
import SmallMovieItem from "./../SmallMovieItem";

const FilterResult = () => {
  return (
    <div className="catalog">
      <div className="container">
        <div className="row row--grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div className="col-6 col-sm-4 col-md-3 col-xl-2" key={item}>
              <SmallMovieItem />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterResult;
