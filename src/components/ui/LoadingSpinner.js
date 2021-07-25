/** @format */

import React from "react";
import spinner from "../../assets/spinner.gif";

const LoadingSpinner = () => {
  return (
    <div className="ui__loading-spinner">
      <div className="spinner">
        <img src={spinner} alt="spinner" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
