/** @format */

import React from "react";
import SeatItem from "./SeatItem";
import "../styles/seat.css";

const SeatMap = ({ seatList, openForm, selectSeat, selectedList }) => {
  const numOfCols = seatList.filter((seatIt) =>
    seatIt.seatNo.startsWith("A")
  ).length;
  return (
    <>
      <div className="screen__movie"></div>
      <div
        className={`seat__list ${
          numOfCols === 16 &&
          window.location.pathname.includes("/manager/room-detail")
            ? "mw-92"
            : ""
        }`}
        style={{
          maxWidth: numOfCols === 16 ? "72%" : "69%",
        }}
      >
        {seatList.map((item) => (
          <SeatItem
            key={item._id}
            seatItem={item}
            clicked={openForm ? openForm : selectSeat}
            seatList={selectedList}
          />
        ))}
      </div>
    </>
  );
};

export default SeatMap;
