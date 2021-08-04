/** @format */

import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CancelBooking from "../../components/customer/CancelBooking";
import Paginator from "../../components/shared/Paginator";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import {
  getCustomerInfoRequest,
  updateCustomerTicketInfoRequest,
} from "../../store/api/user";
import { convertSeatTypeToVietnamese } from "../../utils/convertGender";
import { MAX_ITEMS_PER_PAGE } from "../manager/FilmRoom";
import { checkCondition, convertTime } from "../../utils/helper";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";
import { v4 as uuid_v4 } from "uuid";
import { useDispatch } from "react-redux";

const CustomerTicketInfo = () => {
  const { id } = useParams();
  const [customerInfo, setCustomerInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [isCancelling, setIsCancelling] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const fetchCustomerInfo = () => {
    setIsLoading(true);
    getCustomerInfoRequest(id)
      .then(({ data }) => {
        setCustomerInfo(data?.data || {});
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const confirmTicketHandler = (ticketId) => {
    setIsLoading(true);
    updateCustomerTicketInfoRequest(ticketId)
      .then(() => {
        fetchCustomerInfo();
        const newNoti = {
          id: uuid_v4(),
          type: "success",
          message: "Xác nhận đặt vé thành công!",
        };
        dispatch(addNotification(newNoti));
        setTimeout(() => {
          dispatch(removeNotification(newNoti.id));
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchCustomerInfo();
    // eslint-disable-next-line
  }, [id]);

  const formatter = new Intl.NumberFormat("vi-ve", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="text-white tab-pane my-3">
      <div className="d-flex justify-content-between align-items-center sm-flex-col">
        <h3 className="border-bottom d-inline-block">
          Thông tin vé của khách hàng
        </h3>
        <button
          className={`btn__outline-orange btn-sm`}
          onClick={() => history.push("/staff/customers")}
        >
          <i className="fas fa-chevron-left mr-2"></i> Quay lại danh sách
        </button>
      </div>

      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="info">
          <div className="top__info mt-3 mb-4">
            <div className="row w-100 mb-3">
              <div className="col-5 col-md-2">
                <strong>Tên khách hàng</strong>
              </div>
              <div className="col-7 col-md-9">
                <span>{customerInfo?.customer?.fullname} </span>
              </div>
            </div>
            <div className="row w-100 mb-3">
              <div className="col-5 col-md-2">
                <strong>Số điện thoại</strong>
              </div>
              <div className="col-7 col-md-9">
                <span>{customerInfo?.customer?.phone} </span>
              </div>
            </div>
            <div className="row w-100 mb-3">
              <div className="col-5 col-md-2">
                <strong>Email</strong>
              </div>
              <div className="col-7 col-md-9">
                <span>{customerInfo?.customer?.email} </span>
              </div>
            </div>
          </div>
          <div className="ticket__list">
            <div className="d-flex justify-content-center">
              <h3 className="border-bottom d-inline-block mb-4">
                Danh sách ghế đã đặt
              </h3>
            </div>
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
                      <th>Xác nhận</th>
                      <th>Hủy ghế</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerInfo?.ticket
                      ?.slice(
                        curPage * MAX_ITEMS_PER_PAGE,
                        (curPage + 1) * MAX_ITEMS_PER_PAGE
                      )
                      .map((item, index) => (
                        <tr key={item._id}>
                          <td>
                            <div className="main__table-text">{index + 1}</div>
                          </td>
                          <td>
                            <div className="main__table-text">
                              <Link
                                to={`/details/${item?.schedule?.movie?._id}`}
                              >
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
                              {convertSeatTypeToVietnamese(
                                item?.seat?.seatType
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="main__table-text">
                              {formatter.format(item?.seat?.price)}
                            </div>
                          </td>
                          <td>
                            {item?.status === 1 ? (
                              <div className="text-sm text-green">
                                Đã thanh toán
                              </div>
                            ) : (
                              <button
                                className={`main__table-btn main__table-btn--banned open-modal ${checkCondition(
                                  item?.status === 1,
                                  "divDisable",
                                  ""
                                )}`}
                                onClick={() => confirmTicketHandler(item._id)}
                              >
                                <i className="icon ion-ios-checkmark"></i>
                              </button>
                            )}
                          </td>
                          <td>
                            <button
                              className={`main__table-btn main__table-btn--delete open-modal ${checkCondition(
                                item?.status === 1,
                                "divDisable",
                                ""
                              )}`}
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
          </div>
          <Paginator
            maxPage={Math.ceil(
              (customerInfo?.ticket?.length || 0) / MAX_ITEMS_PER_PAGE
            )}
            curPage={curPage}
            setCurPage={setCurPage}
            totalItems={customerInfo?.ticket?.length || 0}
            isLoading={false}
            scrollAfterClicking
          />
          <CancelBooking
            open={isCancelling}
            close={() => {
              setSelectedTicket({});
              setIsCancelling(false);
            }}
            ticketData={selectedTicket}
            callback={fetchCustomerInfo}
          />
        </div>
      )}
    </div>
  );
};

export default CustomerTicketInfo;
