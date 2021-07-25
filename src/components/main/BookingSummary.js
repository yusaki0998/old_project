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

const BookingSummary = ({ bookingDetail, selectedSeats }) => {
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
          history.push(`/customer/history-transactions`);
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
        message: "Vui lòng chọn ít nhật 1 ghế",
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
        <div className="col-3">
          <img src={poster} alt="poster" />
          <h3>{bookingDetail?.movie?.movieName}</h3>
        </div>
        <div className="col-3">
          <div className="row">
            <div className="col-4">Rạp</div>
            <div className="col-8">Hanoi Cinema</div>
          </div>
          <div className="row">
            <div className="col-4">Ngày chiếu</div>
            <div className="col-8">
              {bookingDetail?.showDate?.substr(0, 10)}
            </div>
          </div>
          <div className="row">
            <div className="col-4">Slot chiếu</div>
            <div className="col-8">
              {bookingDetail?.slot?.slotName} (
              {convertTime(bookingDetail?.slot?.startTime)} -{" "}
              {convertTime(bookingDetail?.slot?.endTime)})
            </div>
          </div>
          <div className="row">
            <div className="col-4">Phòng chiếu</div>
            <div className="col-8">{bookingDetail?.room?.roomName}</div>
          </div>
        </div>
        <div className="col-3">
          <div className="row">
            <div className="col-4">Ghế : </div>
            <div className="col-8">
              <p>
                {selectedSeats.length > 0
                  ? selectedSeats.map((item) => item.seatNo).join(",")
                  : "Vui lòng chọn ghế"}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-4">Tổng : </div>
            <div className="col-8">
              {formatter.format(
                selectedSeats.length > 0
                  ? selectedSeats.reduce((acc, item) => acc + item.price, 0)
                  : 0
              )}
            </div>
          </div>
        </div>
        <div className="col-3">
          <button
            className={`card__trailer text-yellow ${checkCondition(
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
