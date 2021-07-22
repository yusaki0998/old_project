/** @format */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import poster from "../../assets/poster.jpg";
import { convertTime, justContainNumber } from "../../utils/helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { showAgeThreshold } from "../../utils/age";
import { useSelector } from "react-redux";
import { getMovieScheduleRequest } from "../../store/api/global";
import LoadingSpinner from "../ui/LoadingSpinner";
import { getRandomRatingForMovie } from "../../utils/constants";
import { getRatingColor } from "./MovieItem";

export const showTotalTime = (time) => {
  if (!time) {
    return "-";
  }
  if (justContainNumber(time?.toString())) {
    return `${time} minutes`;
  }
  return time;
};

const TopMovieDetail = ({ movieDetail }) => {
  const [unvailableFilm, setUnAvailableFilm] = useState(false);
  const [scheduleDetail, setScheduleDetail] = useState(null);
  const [ticketDate, setTicketDate] = useState(new Date());
  const [isShowBooking, setIsShowBooking] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const history = useHistory();

  const rating = getRandomRatingForMovie();

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

  const fetchMovieScheduleDetail = () => {
    setLoadingSchedule(true);
    getMovieScheduleRequest(movieDetail?._id)
      .then(({ data }) => {
        if (data?.data?.schedule?.length === 0) {
          setUnAvailableFilm(true);
        } else {
          setScheduleDetail(data?.data?.schedule || []);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoadingSchedule(false));
  };

  return (
    <>
      <h1 className="section__title section__title--mb">Nội dung phim</h1>
      <div className="card card--details">
        <div className="row w-100">
          <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-2">
            <div className="card__cover">
              <img src={poster} alt="poster" />
              <span
                className={`card__rate card__rate--green ${getRatingColor(
                  rating
                )}`}
              >
                {rating}
              </span>
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
                  ...
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
              {movieDetail?.status === 1 && (
                <button
                  className="card__trailer"
                  onClick={() => {
                    if (!isAuthenticated) {
                      history.push(
                        `/signin?redirectUrl=/details/${movieDetail?._id}`
                      );
                    } else {
                      setIsShowBooking((prevState) => !prevState);
                      fetchMovieScheduleDetail();
                    }
                  }}
                >
                  <i className="icon ion-ios-cart"></i> Mua vé
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="card__description">{movieDetail?.description}</div>
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
            </div>
            <div className="col-md-9">
              <p>Khung giờ</p>
              {loadingSchedule && <LoadingSpinner />}
              {unvailableFilm && (
                <p className="text-white my-2">
                  Phim hiện tại chưa có lịch chiếu
                </p>
              )}
              <div className="slot__list-row">
                {scheduleDetail?.length > 0 &&
                  scheduleDetail?.map((item) => (
                    <div
                      className={`slot__item`}
                      key={item._id}
                      onClick={() => history.push(`/select-seat/${item._id}`)}
                    >
                      <div>
                        <span className="slot__badge">
                          {item?.slot?.slotName}
                        </span>
                      </div>
                      <div>
                        <span className="slot__text">
                          {convertTime(item?.slot?.startTime)} -{" "}
                          {convertTime(item?.slot?.endTime)}
                          <br />
                        </span>
                        <span className="text-sm">{item?.room?.roomName}</span>
                      </div>
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
