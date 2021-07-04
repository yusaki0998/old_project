/** @format */

import React from "react";
import SeatItem from "./SeatItem";
import "../styles/seat.css";

const SeatMap = ({ seatList, openForm }) => {
  return (
    <>
      <div className="screen__movie"></div>
      <div className="seat__list">
        {seatList.map((item) => (
          <SeatItem key={item._id} seatItem={item} clicked={openForm} />
        ))}
      </div>
    </>
  );
};

export default SeatMap;
