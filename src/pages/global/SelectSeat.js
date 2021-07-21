/** @format */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { scrollToTop } from "../../utils/scrollToTopPos";
import { getMovieSeatsRequest } from "../../store/api/global";
import { useHistory, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import SeatMap from "../../components/manager/SeatMap";
import BookingSeatTypes from "../../components/main/BookingSeatTypes";
import BookingSummary from "../../components/main/BookingSummary";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";
import { v4 as uuid_v4 } from "uuid";
import { useDispatch } from "react-redux";

const SelectSeat = () => {
  const [bookingDetail, setBookingDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    scrollToTop();
  }, []);

  const fetchMovieSeatMap = () => {
    setIsLoading(true);
    getMovieSeatsRequest(id)
      .then(({ data }) => {
        setBookingDetail(data?.data || {});
      })
      .catch((err) => {
        console.log(err);
        history.goBack();
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchMovieSeatMap();
    // eslint-disable-next-line
  }, [id]);

  const selectSeatHandler = (seat) => {
    const isSeleted = selectedSeats.find((item) => item?._id === seat?._id);
    if (!isSeleted) {
      setSelectedSeats((prevState) => [...prevState, seat]);
    } else {
      setSelectedSeats((prevState) =>
        prevState.filter((item) => item._id !== seat._id)
      );
      const newNoti = {
        id: uuid_v4(),
        type: "success",
        message: "Bỏ chọn ghế thành công",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Đặt vé phim {bookingDetail?.movie?.movieName || ""} </title>
      </Helmet>
      <div className="mt-5 pt-5"></div>
      {isLoading && (
        <>
          <LoadingSpinner />
        </>
      )}
      {!isLoading && bookingDetail?._id && (
        <>
          <h1 className="text-center text-white">Booking Online</h1>
          <section className="content">
            <SeatMap
              seatList={bookingDetail?.roomSeats}
              selectSeat={selectSeatHandler}
              selectedList={selectedSeats}
            />
            <BookingSeatTypes />
            <BookingSummary
              bookingDetail={bookingDetail}
              selectedSeats={selectedSeats}
            />
          </section>
        </>
      )}
    </>
  );
};

export default SelectSeat;
