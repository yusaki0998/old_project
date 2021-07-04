/** @format */

import React from "react";

const SeatItem = ({ seatItem, clicked }) => {
  return (
    <div
      className={`seat__item ${seatItem.seatType === "vip" ? "vip" : ""}`}
      onClick={() => clicked(seatItem)}
    >
      <div className="seat__head"></div>
      <div className="seat__body">
        <span className="seat__text">{seatItem.seatNo}</span>
      </div>
    </div>
  );
};

export default SeatItem;
