/** @format */

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router-dom";
import { getStaffDetailRequest } from "../../store/api/manager";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Skeleton from "react-loading-skeleton";
import { MAX_ITEMS_PER_PAGE } from "./FilmRoom";
import Paginator from "../../components/shared/Paginator";
import { formatter } from "../customer/OrderHistory";
import { convertSeatTypeToVietnamese } from "../../utils/convertGender";

const uniformDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${month > 8 ? month + 1 : `0${month + 1}`}-${
    day > 9 ? day : `0${day}`
  }-${year}`;
};

const StaffInfo = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [staffDetailData, setStaffDetailData] = useState({});
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [curPage, setCurPage] = useState(0);

  const fetchStaffDetail = () => {
    setIsLoading(true);
    getStaffDetailRequest(id, uniformDate(startDate), uniformDate(endDate))
      .then(({ data }) => {
        setStaffDetailData(data?.data);
        setIsLoading(false);
      })
      .catch((_) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!id) {
      history.goBack();
    } else {
      fetchStaffDetail();
    }
    // eslint-disable-next-line
  }, [history]);

  const revenue =
    staffDetailData?.ticketHistory?.reduce(
      (acc, item) => acc + item?.seat?.price,
      0
    ) || 0;

  return (
    <div className="text-white mt-4">
      <Helmet>
        <title> Báo cáo thống kê </title>
      </Helmet>
      <h3 className="mb-3">Báo cáo thống kê</h3>
      <div className="row">
        <div className="col-md-5">
          <div className="row align-items-center mb-3">
            <div className="col-md-3">
              <p>Bắt đầu</p>
            </div>
            <div className="col-md-9">
              <div className="sign__group">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <div className="col-md-3">
              <p>Kết thúc</p>
            </div>
            <div className="col-md-9">
              <div className="sign__group">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </div>
            </div>
          </div>
          <button
            className={`btn__outline-orange ml-0 mb-4 btn-sm ${
              isLoading ? "divDisable" : ""
            }`}
            onClick={fetchStaffDetail}
          >
            {isLoading ? "Đang kiểm tra" : "Kiểm tra"}
          </button>
        </div>
        <div className="col-md-7">
          <>
            <div className="row align-items-center mb-3">
              <div className="col-md-3">
                <strong>Tên tài khoản</strong>
              </div>
              <div className="col-md-9">
                {isLoading ? (
                  <Skeleton width={160} height={20} />
                ) : (
                  <p className="mb-0">{staffDetailData?.staffInfo?.email}</p>
                )}
              </div>
            </div>
            <div className="row align-items-center mb-3">
              <div className="col-md-3">
                <strong>Tên nhân viên</strong>
              </div>
              <div className="col-md-9">
                {isLoading ? (
                  <Skeleton width={120} height={20} />
                ) : (
                  <p className="mb-0">{staffDetailData?.staffInfo?.fullname}</p>
                )}
              </div>
            </div>
            <div className="row align-items-center mb-3">
              <div className="col-md-3">
                <strong>Số vé đã bán</strong>
              </div>
              <div className="col-md-9">
                {isLoading ? (
                  <Skeleton width={60} height={20} />
                ) : (
                  <p className="mb-0">{staffDetailData?.ticketReport || 0}</p>
                )}
              </div>
            </div>
            <div className="row align-items-center mb-3">
              <div className="col-md-3">
                <strong>Tổng doanh thu</strong>
              </div>
              <div className="col-md-9">
                {isLoading ? (
                  <Skeleton width={160} height={20} />
                ) : (
                  <p className="mb-0">{formatter.format(revenue)}</p>
                )}
              </div>
            </div>
          </>
        </div>
      </div>
      <div className="data__list">
        {isLoading && <LoadingSpinner />}
        {!isLoading && staffDetailData?.ticketHistory?.length === 0 && (
          <p className="text-white text-center">Không có dữ liệu để hiển thị</p>
        )}
        {!isLoading && staffDetailData?.ticketHistory?.length > 0 && (
          <div className="main__table-wrap stafInfo__table">
            <table className="main__table">
              <thead>
                <tr>
                  <th>Ngày đặt</th>
                  <th>Tên phim</th>
                  <th>Ngày chiếu</th>
                  <th>Giờ chiếu</th>
                  <th>Phòng chiếu</th>
                  <th>Số ghế</th>
                  <th>Loại ghế</th>
                  <th>Giá vé</th>
                </tr>
              </thead>
              <tbody>
                {staffDetailData?.ticketHistory
                  ?.slice(
                    curPage * MAX_ITEMS_PER_PAGE,
                    (curPage + 1) * MAX_ITEMS_PER_PAGE
                  )
                  .map((ticket, index) => (
                    <tr key={ticket._id}>
                      <td>
                        <div className="main__table-text">{index + 1}</div>
                      </td>
                      <td>
                        <div className="main__table-text">
                          {ticket?.schedule?.movie?.movieName || "-"}
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">
                          {ticket?.schedule?.showDate?.substr(0, 10)}
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">
                          {ticket?.schedule?.slot?.slotName}
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">
                          {ticket?.schedule?.room?.roomName}
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">
                          {ticket?.seat?.seatNo}
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">
                          {convertSeatTypeToVietnamese(ticket?.seat?.seatType)}
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">
                          {formatter.format(ticket?.seat?.price)}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        <Paginator
          maxPage={Math.ceil(
            staffDetailData?.ticketHistory?.length / MAX_ITEMS_PER_PAGE
          )}
          curPage={curPage}
          setCurPage={setCurPage}
          totalItems={staffDetailData?.ticketHistory?.length}
          isLoading={isLoading}
          scrollAfterClicking
        />
      </div>
    </div>
  );
};

export default StaffInfo;
