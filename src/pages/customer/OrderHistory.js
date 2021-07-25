/** @format */

import React, { useEffect, useState } from "react";
import Paginator from "../../components/shared/Paginator";
import { getUserTicketOrderHistoryRequest } from "../../store/api/user";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { MAX_ITEMS_PER_PAGE } from "../manager/FilmRoom";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import CancelBooking from "../../components/customer/CancelBooking";
import { convertSeatTypeToVietnamese } from "../../utils/convertGender";
import { useSelector } from "react-redux";
import { convertTime } from "../../utils/helper";

const OrderHistory = () => {
  const [loading, setLoading] = useState(false);
  const [ticketList, setTicketList] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [isCancelling, setIsCancelling] = useState(false);
  const { loginData } = useSelector((state) => state.auth);

  const fetchOrderHistory = () => {
    setLoading(true);
    getUserTicketOrderHistoryRequest()
      .then(({ data }) => {
        setTicketList(data?.data || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("vi-ve", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="customer__order-history__wrapper my-5">
      <Helmet>
        <title> Lịch sử đặt vé </title>
      </Helmet>
      {loading && <LoadingSpinner />}
      {!loading && (
        <div className="col-12">
          <div className="main__table-wrap">
            <table className="main__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên Phim</th>
                  <th>Ngày chiếu</th>
                  <th>Giờ chiếu</th>
                  <th>Phòng Chiếu</th>
                  <th>Số Ghế</th>
                  <th>Loại Ghế</th>
                  <th>Giá vé</th>
                  <th>Hủy ghế</th>
                </tr>
              </thead>
              <tbody>
                {ticketList
                  .slice(
                    curPage * MAX_ITEMS_PER_PAGE,
                    (curPage + 1) * MAX_ITEMS_PER_PAGE
                  )
                  .map((item, index) => (
                    <tr key={item._id}>
                      <td>
                        <div className="main__table-text"> {index + 1} </div>
                      </td>
                      <td>
                        <div className="main__table-text">
                          <Link to={`/details/${item?.schedule?.movie?._id}`}>
                            {item?.schedule?.movie?.movieName}
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">
                          {item?.schedule?.showDate?.substr(0, 10)}
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">
                          {convertTime(item?.schedule?.slot?.startTime)} -{" "}
                          {convertTime(item?.schedule?.slot?.endTime)}
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">
                          {item?.schedule?.room?.roomName}
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">
                          {item?.seat?.seatNo}
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">
                          {convertSeatTypeToVietnamese(item?.seat?.seatType)}
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">
                          {formatter.format(item?.seat?.price)}
                        </div>
                      </td>
                      <td>
                        <button
                          className={`main__table-btn main__table-btn--delete open-modal ${
                            loginData?.data?.role === "staff" ||
                            item.status === 1
                              ? "divDisable"
                              : ""
                          }`}
                          onClick={() => {
                            setIsCancelling(true);
                            setSelectedTicket(item);
                          }}
                        >
                          <i className="icon ion-ios-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Paginator
        maxPage={Math.ceil(ticketList.length / MAX_ITEMS_PER_PAGE)}
        curPage={curPage}
        setCurPage={setCurPage}
        totalItems={ticketList.length}
        isLoading={loading}
        scrollAfterClicking
      />
      <CancelBooking
        open={isCancelling}
        close={() => {
          setSelectedTicket({});
          setIsCancelling(false);
        }}
        ticketData={selectedTicket}
        callback={fetchOrderHistory}
      />
    </div>
  );
};

export default OrderHistory;
