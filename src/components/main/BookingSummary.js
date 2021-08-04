/** @format */

import React, { useState } from "react";
import poster from "../../assets/poster.jpg";
import { checkCondition, convertTime } from "../../utils/helper";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";
import { v4 as uuid_v4 } from "uuid";
import { useDispatch } from "react-redux";
import { bookTicketRequest } from "../../store/api/global";
import { useHistory } from "react-router-dom";

const BookingSummary = ({ bookingDetail, selectedSeats, isStaff }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isBooking, setIsBooking] = useState(false);

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("vi-ve", {
    style: "currency",
    currency: "VND",
  });

  const bookTicketHandler = () => {
    if (selectedSeats.length > 0) {
      const reqData = selectedSeats.map((item) => ({
        seatNo: item.seatNo,
        seatType: item.seatType,
        price: item.price,
        status: "chosen",
        row: item.row,
        column: item.column,
      }));
      setIsBooking(true);
      bookTicketRequest(bookingDetail?._id, reqData)
        .then(() => {
          const newNoti = {
            id: uuid_v4(),
            type: "success",
            message: "Đặt vé thành công. Vui lòng kiểm tra lịch sử đặt vé",
          };
          dispatch(addNotification(newNoti));
          setTimeout(() => {
            dispatch(removeNotification(newNoti.id));
          }, 2000);
          history.push(
            isStaff ? "/staff/ticket-history" : `/customer/history-transactions`
          );
        })
        .catch((err) => {
          const newNoti = {
            id: uuid_v4(),
            type: "error",
            message:
              err?.response?.data?.message ||
              "Không thể đặt vé. Vui lòng thử lại",
          };
          dispatch(addNotification(newNoti));
          setTimeout(() => {
            dispatch(removeNotification(newNoti.id));
          }, 2000);
        })
        .finally(() => setIsBooking(false));
    } else {
      const newNoti = {
        id: uuid_v4(),
        type: "error",
        message: "Vui lòng chọn ít nhất 1 ghế",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
    }
  };
  return (
    <div className="booking__summary">
      <div className="row align-items-center">
        <div className="col-md-3 col-12">
          <img
            src={
              bookingDetail?.movie?.coverImage?.includes("cloudinary")
                ? bookingDetail?.movie?.coverImage
                : poster
            }
            alt="poster"
          />
          <h4>{bookingDetail?.movie?.movieName}</h4>
        </div>
        <div className="col-md-4 col-12 sm-mb-2">
          <div className="row">
            <div className="col-12">
              <strong>Ngày chiếu : </strong>{" "}
              <span>{bookingDetail?.showDate?.substr(0, 10)}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <strong>Giờ chiếu : </strong>{" "}
              <span>
                {bookingDetail?.slot?.slotName} (
                {convertTime(bookingDetail?.slot?.startTime)} -{" "}
                {convertTime(bookingDetail?.slot?.endTime)})
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 ">
              <strong>Phòng chiếu : </strong>
              <span>{bookingDetail?.room?.roomName}</span>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-12 sm-mb-2">
          <div className="row">
            <div className="col-12">
              <strong>Ghế : </strong>{" "}
              <span>
                {selectedSeats.length > 0
                  ? selectedSeats.map((item) => item.seatNo).join(",")
                  : "Vui lòng chọn ghế"}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <strong>Tổng : </strong>{" "}
              <span>
                {formatter.format(
                  selectedSeats.length > 0
                    ? selectedSeats.reduce((acc, item) => acc + item.price, 0)
                    : 0
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-12">
          <button
            className={`card__trailer text-yellow btn-filled ${checkCondition(
              isBooking,
              "divDisable",
              ""
            )}`}
            onClick={bookTicketHandler}
          >
            {isBooking ? (
              "Đang xử lý"
            ) : (
              <>
                <i className="icon ion-ios-cart"></i> Đặt vé
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
