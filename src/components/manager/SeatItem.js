/** @format */

import React from "react";

const SeatItem = ({ seatItem, clicked, seatList }) => {
  return (
    <div
      className={`seat__item ${seatItem.seatType === "vip" ? "vip" : ""} ${
        seatList && seatList.find((item) => item._id === seatItem._id)
          ? "isChosen"
          : ""
      } ${seatItem.status === "pending" ? "unavailable" : ""}`}
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
