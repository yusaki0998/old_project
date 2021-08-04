/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { scrollToTop } from "../../utils/scrollToTopPos";
import { getMovieSeatsRequest } from "../../store/api/global";
import { useHistory, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import SeatMap from "../../components/manager/SeatMap";
import BookingSeatTypes from "../../components/main/BookingSeatTypes";
import BookingSummary from "../../components/main/BookingSummary";

const SelectSeat = ({ isStaff }) => {
  const [bookingDetail, setBookingDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const [selectedSeats, setSelectedSeats] = useState([]);

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

  const syncMovieSeatMapOnBackground = useCallback(() => {
    getMovieSeatsRequest(id)
      .then(({ data }) => {
        if (!!data.data) {
          setBookingDetail(data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    fetchMovieSeatMap();
    return () => {
      setBookingDetail({});
    };
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      syncMovieSeatMapOnBackground();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [syncMovieSeatMapOnBackground]);

  const selectSeatHandler = (seat) => {
    const isSeleted = selectedSeats.find((item) => item?._id === seat?._id);
    if (!isSeleted) {
      setSelectedSeats((prevState) => [...prevState, seat]);
    } else {
      setSelectedSeats((prevState) =>
        prevState.filter((item) => item._id !== seat._id)
      );
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
              isStaff={isStaff}
            />
          </section>
        </>
      )}
    </>
  );
};

export default SelectSeat;
