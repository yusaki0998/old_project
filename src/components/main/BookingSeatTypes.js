/** @format */

import React from "react";

const BookingSeatTypes = () => {
  return (
    <div className="mb-5">
      <div className="seat__types seat__list d-flex justify-content-center w-auto">
        <div className="d-flex align-items-center justify-content-center flex-col mr-4">
          <div className="d-flex align-items-center mr-4">
            <div className="seat__item unavailable">
              <div className="seat__head"></div>
              <div className="seat__body">
                <span className="seat__text"></span>
              </div>
            </div>
            <span className="text-white">Ghế đã được chọn</span>
          </div>
          <div className="d-flex align-items-center align-self-start">
            <div className="seat__item isChosen">
              <div className="seat__head"></div>
              <div className="seat__body">
                <span className="seat__text"></span>
              </div>
            </div>
            <span className="text-white">Ghế đang chọn</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-col mr-4">
          <div className="d-flex align-items-center mr-4">
            <div className="seat__item vip">
              <div className="seat__head"></div>
              <div className="seat__body">
                <span className="seat__text"></span>
              </div>
            </div>
            <span className="text-white">Ghế VIP</span>
          </div>
          <div className="d-flex align-items-center">
            <div className="seat__item">
              <div className="seat__head"></div>
              <div className="seat__body">
                <span className="seat__text"></span>
              </div>
            </div>
            <span className="text-white">Ghế Thường</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-col">
          <div className="d-flex align-items-center mr-4">
            <div className="seat__item sold">
              <div className="seat__head"></div>
              <div className="seat__body">
                <span className="seat__text"></span>
              </div>
            </div>
            <span className="text-white">Ghế đã bán</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSeatTypes;
