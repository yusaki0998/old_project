/** @format */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import poster from "../../assets/poster.jpg";
import { convertTime, justContainNumber } from "../../utils/helper";
import { showAgeThreshold } from "../../utils/age";
import { useSelector } from "react-redux";
import { getMovieScheduleRequest } from "../../store/api/global";
import LoadingSpinner from "../ui/LoadingSpinner";
import OutsideHandler from "../shared/ClickWrapper";

export const showTotalTime = (time) => {
  if (!time) {
    return "-";
  }
  if (justContainNumber(time?.toString())) {
    return `${time} phút`;
  }
  return time;
};

const TopMovieDetail = ({ movieDetail, hideSuggestion }) => {
  const [unvailableFilm, setUnAvailableFilm] = useState(false);
  const [scheduleDetail, setScheduleDetail] = useState(null);
  const [dateDetail, setDateDetail] = useState([]);
  const [ticketDate, setTicketDate] = useState("");
  const [isShowBooking, setIsShowBooking] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const { isAuthenticated, loginData } = useSelector((state) => state.auth);
  const [viewDate, setViewDate] = useState(false);
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

  const fetchMovieScheduleDetail = () => {
    setLoadingSchedule(true);
    getMovieScheduleRequest(movieDetail?._id)
      .then(({ data }) => {
        if (data?.data?.schedule?.length === 0) {
          setUnAvailableFilm(true);
        } else {
          setScheduleDetail(data?.data?.schedule || []);
          setDateDetail(data?.data?.date);
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
              <img
                src={
                  movieDetail?.coverImage?.includes("cloudinary")
                    ? movieDetail?.coverImage
                    : poster
                }
                alt="poster"
              />
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
                  <span className="font-weight-bold">Khởi chiếu:</span>
                  {movieDetail?.showtimes?.toString()?.substr(0, 10)}
                </li>
                <li>
                  <span className="font-weight-bold">Độ tuổi:</span>{" "}
                  <span className="text-uppercase font-weight-bold">
                    {showAgeThreshold(movieDetail?.ageRating)}
                  </span>
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
                  className={`card__trailer ${
                    loginData?.data?.role &&
                    loginData?.data?.role !== "customer" &&
                    loginData?.data?.role !== "staff"
                      ? "d-none"
                      : ""
                  }`}
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
              <p>Ngày chiếu phim</p>
              <OutsideHandler callback={() => setViewDate(false)}>
                <div
                  className={`sign-custom__select ${viewDate ? "show" : ""}`}
                  onClick={() => setViewDate((prevState) => !prevState)}
                >
                  <li className="gender__text">
                    {ticketDate ? ticketDate : "Vui lòng chọn"}
                  </li>
                  <ul
                    className={`${viewDate ? "show" : ""}`}
                    style={{
                      maxHeight: 180,
                      overflowY: "scroll",
                    }}
                  >
                    {dateDetail?.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => setTicketDate(item?.substr(0, 10))}
                      >
                        {item?.substr(0, 10)}
                      </li>
                    ))}
                  </ul>
                  <button className="sign__select-icon">
                    <i
                      className={`fas fa-chevron-${viewDate ? "up" : "down"}`}
                    ></i>
                  </button>
                </div>
              </OutsideHandler>
            </div>
            <div className="col-md-9">
              <p>Khung giờ</p>
              {loadingSchedule && <LoadingSpinner />}
              {unvailableFilm && (
                <p className="text-white my-2">
                  Phim hiện tại chưa có lịch chiếu
                </p>
              )}
              {!ticketDate && (
                <p className="text-white my-2">Vui lòng chọn ngày chiếu</p>
              )}
              <div className="slot__list-row">
                {ticketDate &&
                  scheduleDetail?.length > 0 &&
                  scheduleDetail
                    ?.filter(
                      (scheduleItem) =>
                        !!ticketDate &&
                        scheduleItem?.showDate?.includes(ticketDate)
                    )
                    ?.map((item) => (
                      <div
                        className={`slot__item`}
                        key={item._id}
                        onClick={() =>
                          history.push(
                            hideSuggestion
                              ? `/staff/select-seat/${item._id}`
                              : `/select-seat/${item._id}`
                          )
                        }
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
                          <span className="text-sm">
                            {item?.room?.roomName}
                          </span>
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
