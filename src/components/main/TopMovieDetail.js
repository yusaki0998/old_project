/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import poster from "../../assets/poster.jpg";
import { convertTime, justContainNumber } from "../../utils/helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const TopMovieDetail = ({ movieDetail, listSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [ticketDate, setTicketDate] = useState(new Date());
  const [isShowBooking, setIsShowBooking] = useState(false);
  const history = useHistory();

  const showTotalTime = (time) => {
    if (!time) {
      return "";
    }
    if (justContainNumber(time?.toString())) {
      return `${time} minutes`;
    }
    return time;
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h1 className="section__title section__title--mb">
            {movieDetail.movieName}
          </h1>
        </div>
        <div className="col-12 col-xl-6">
          <div className="card card--details">
            <div className="row">
              <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-5">
                <div className="card__cover">
                  <img src={poster} alt="poster" />
                  <span className="card__rate card__rate--green">8.4</span>
                </div>
                <a
                  href="http://www.youtube.com/watch?v=0O2aH4XLbto"
                  className="card__trailer"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="icon ion-ios-play-circle"></i> Watch trailer
                </a>
                <button
                  className="card__trailer"
                  onClick={() => setIsShowBooking((prevState) => !prevState)}
                >
                  <i className="icon ion-ios-cart"></i> Mua vé
                </button>
              </div>
              <div className="col-12 col-md-8 col-lg-9 col-xl-7">
                <div className="card__content">
                  <ul className="card__meta">
                    <li>
                      <span>Đạo diễn:</span> {movieDetail?.director}
                    </li>
                    <li>
                      <span>Diễn viên : </span>
                      {movieDetail?.actor?.split(", ").map((name, index) => (
                        <span key={index}>{name},</span>
                      ))}
                    </li>
                    <li>
                      <span>Thể loại:</span>
                      {movieDetail?.genre}
                    </li>
                    <li>
                      <span>Phát hành:</span>
                      {movieDetail?.showtimes?.toString()?.substr(0, 4)}
                    </li>
                    <li>
                      <span>Độ tuổi:</span>{" "}
                      {showTotalTime(movieDetail?.ageRating)}
                    </li>
                    <li>
                      <span>Thời lượng:</span>{" "}
                      {showTotalTime(movieDetail?.amountOfTime)}
                    </li>
                    <li>
                      <span>Quốc gia:</span>
                      {movieDetail?.nation}
                    </li>
                  </ul>
                  <div className="card__description">
                    {movieDetail?.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-6">
          <video
            controls
            crossOrigin="true"
            playsInline
            poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
            id="player"
            style={{
              width: "100%",
            }}
          >
            <source
              src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
              type="video/mp4"
              size="576"
            />
            <source
              src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
              type="video/mp4"
              size="720"
            />
            <source
              src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
              type="video/mp4"
              size="1080"
            />

            <track
              kind="captions"
              label="English"
              srcLang="en"
              src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
              default
            />
            <track
              kind="captions"
              label="Français"
              srcLang="fr"
              src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
            />

            <a
              href="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
              download
            >
              Download
            </a>
          </video>
        </div>
      </div>
      {isShowBooking && (
        <div className="booking__ticket my-5 text-white">
          <div className="row">
            <div className="col-md-3">
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
