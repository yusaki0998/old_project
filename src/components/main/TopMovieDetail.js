/** @format */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import poster from "../../assets/poster.jpg";
import { convertTime, justContainNumber } from "../../utils/helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { showAgeThreshold } from "../../utils/age";

export const showTotalTime = (time) => {
  if (!time) {
    return "-";
  }
  if (justContainNumber(time?.toString())) {
    return `${time} minutes`;
  }
  return time;
};

const TopMovieDetail = ({ movieDetail, listSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [ticketDate, setTicketDate] = useState(new Date());
  const [isShowBooking, setIsShowBooking] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isShowBooking) {
      const description = document.querySelector(".card__description");
      window.scrollTo({
        left: 0,
        top: description?.offsetTop + description?.clientHeight + 100 || 0,
        behavior: "smooth",
      });
    }
  }, [isShowBooking]);

  return (
    <>
      <div className="row">
        <h1 className="section__title section__title--mb">Nội dung phim</h1>
        <div className="col-12 col-xl-12">
          <div className="card card--details">
            <div className="row">
              <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <div className="card__cover">
                  <img src={poster} alt="poster" />
                  <span className="card__rate card__rate--green">8.4</span>
                </div>
              </div>
              <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <div className="card__content">
                  <h1 className="section__title section__title--mb movie__name">
                    {movieDetail?.movieName}
                  </h1>
                  <ul className="card__meta">
                    <li>
                      <span className="font-weight-bold">Đạo diễn:</span>{" "}
                      {movieDetail?.director}
                    </li>
                    <li>
                      <span className="font-weight-bold">Diễn viên : </span>
                      {movieDetail?.actor?.split(", ").map((name, index) => (
                        <span key={index}>{name},</span>
                      ))}
                    </li>
                    <li>
                      <span className="font-weight-bold">Thể loại:</span>
                      {movieDetail?.genre}
                    </li>
                    <li>
                      <span className="font-weight-bold">Phát hành:</span>
                      {movieDetail?.showtimes?.toString()?.substr(0, 10)}
                    </li>
                    <li>
                      <span className="font-weight-bold">Độ tuổi:</span>{" "}
                      {showAgeThreshold(movieDetail?.ageRating)}
                    </li>
                    <li>
                      <span className="font-weight-bold">Thời lượng:</span>{" "}
                      {showTotalTime(movieDetail?.amountOfTime)}
                    </li>
                    <li>
                      <span className="font-weight-bold">Quốc gia:</span>
                      {movieDetail?.nation}
                    </li>
                  </ul>
                  <button
                    className="card__trailer"
                    onClick={() => setIsShowBooking((prevState) => !prevState)}
                  >
                    <i className="icon ion-ios-cart"></i> Mua vé
                  </button>
                </div>
              </div>
            </div>
            <div className="card__description">{movieDetail?.description}</div>
          </div>
        </div>
      </div>
      {isShowBooking && (
        <div className="booking__ticket my-5 text-white">
          <div className="row">
            <div className="col-md-3 mb-3">
              <p>Ngày mua vé</p>
              <DatePicker
                selected={ticketDate}
                onChange={(date) => setTicketDate(date)}
              />
              {selectedSlot && (
                <button
                  className="card__trailer"
                  onClick={() => history.push("/")}
                  style={{
                    width: 208,
                  }}
                >
                  Tiến hành chọn ghế
                </button>
              )}
            </div>
            <div className="col-md-9">
              <p>Khung giờ</p>
              <div className="slot__list-row">
                {listSlot.map((item) => (
                  <div
                    className={`slot__item ${
                      selectedSlot === item._id ? "active" : ""
                    }`}
                    key={item._id}
                    onClick={() => setSelectedSlot(item._id)}
                  >
                    <span className="slot__badge"> {item.slotName} </span>
                    <span className="slot__text">
                      {convertTime(item.startTime)} -{" "}
                      {convertTime(item.endTime)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopMovieDetail;
