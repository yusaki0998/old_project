/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListRoom,
  getListCurrentFilm,
  getListSlot,
} from "../../store/actions/managerActions";
import { getListStaff } from "../../store/actions/adminActions";
// import Paginator from "../../components/shared/Paginator";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OutsideHandler from "../../components/shared/ClickWrapper";
import { getRevenueListRequest } from "../../store/api/manager";
import RevenueList from "../../components/manager/RevenueList";
import { formatter } from "../customer/OrderHistory";
import { v4 as uuid_v4 } from "uuid";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";

export const MAX_ITEMS_PER_PAGE = 10;

const convertDateToStr = (dateItem) => {
  const monthStr =
    dateItem.getMonth() + 1 > 9
      ? `${dateItem.getMonth() + 1}`
      : `0${dateItem.getMonth() + 1}`;
  const dayStr =
    dateItem.getDate() > 9 ? `${dateItem.getDate()}` : `0${dateItem.getDate()}`;
  const dateStr = `${monthStr}-${dayStr}-${dateItem.getFullYear()}`;
  return dateStr;
};

const Revenue = () => {
  const dispatch = useDispatch();
  const {
    room: roomData,
    currentFilm,
    slot: slotData,
  } = useSelector((state) => state.manager);
  const { staffs } = useSelector((state) => state.admin);
  const [filteredList, setFilteredList] = useState([]);
  // const [curPage, setCurPage] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showFilmList, setShowFilmList] = useState(false);
  const [filmId, setFilm] = useState("");
  const [showRoomList, setShowRoomList] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [showSlotList, setShowSlotList] = useState(false);
  const [slotId, setSlotId] = useState("");
  const [showStaffList, setShowStaffList] = useState(false);
  const [staffId, setStaffId] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [totalInfo, setTotalInfo] = useState(null);

  useEffect(() => {
    dispatch(getListRoom());
    dispatch(getListCurrentFilm());
    dispatch(getListSlot());
    dispatch(getListStaff());
  }, [dispatch]);

  const getRevenueList = async () => {
    setIsLoading(true);
    try {
      const { data } = await getRevenueListRequest(
        convertDateToStr(startDate),
        convertDateToStr(endDate),
        filmId,
        roomId,
        slotId,
        staffId
      );
      setFilteredList(data?.data?.report || []);
      setTotalInfo({
        ticket: data?.data?.ticket || 0,
        totalIncome: data?.data?.total?.income || 0,
      });
    } catch (error) {
      setFilteredList([]);
      setTotalInfo(null);
      const newNoti = {
        id: uuid_v4(),
        type: "error",
        message:
          error?.response?.data?.message ||
          "T??m ki???m th???t b???i. Vui l??ng th??? l???i!",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tab-pane">
      <Helmet>
        <title>B??o C??o Th???ng K?? </title>
      </Helmet>
      <div className="row">
        <div className="col-12">
          <h3 className="text-white mt-3">B??o C??o Th???ng K??</h3>
          <div className="filter__engine text-white">
            <div className="row">
              <div className="col-md-3 col-6">
                <div className="sign__group">
                  <p className="label font-weight-bold mb-1">T??? ng??y</p>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="sign__group">
                  <p className="label font-weight-bold mb-1">?????n ng??y</p>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-4 col-6">
                <div className="sign__group">
                  <p className="label font-weight-bold mb-1">Phim</p>
                  <OutsideHandler callback={() => setShowFilmList(false)}>
                    <div
                      className={`sign-custom__select ${
                        showFilmList ? "show" : ""
                      }`}
                      onClick={() => setShowFilmList((prevState) => !prevState)}
                    >
                      <li className="gender__text">
                        {filmId
                          ? currentFilm?.list?.find(
                              (item) => item._id === filmId
                            )?.movieName
                          : "Vui l??ng ch???n"}
                      </li>
                      <ul
                        className={`h-250 overflow-y-scr ${
                          showFilmList ? "show" : ""
                        }`}
                      >
                        {currentFilm?.list?.map((film) => (
                          <li key={film._id} onClick={() => setFilm(film._id)}>
                            {film.movieName}
                          </li>
                        ))}
                        <li onClick={() => setFilm("")}>Hu??? ch???n</li>
                      </ul>
                      <button className="sign__select-icon">
                        <i
                          className={`fas fa-chevron-${
                            showFilmList ? "up" : "down"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </OutsideHandler>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-6">
                <div className="sign__group">
                  <p className="label font-weight-bold mb-1">Ph??ng</p>
                  <OutsideHandler callback={() => setShowRoomList(false)}>
                    <div
                      className={`sign-custom__select ${
                        showRoomList ? "show" : ""
                      }`}
                      onClick={() => setShowRoomList((prevState) => !prevState)}
                    >
                      <li className="gender__text">
                        {roomId
                          ? roomData?.list?.find((item) => item._id === roomId)
                              ?.roomName
                          : "Vui l??ng ch???n"}
                      </li>
                      <ul
                        className={`h-250 overflow-y-scr ${
                          showRoomList ? "show" : ""
                        }`}
                      >
                        {roomData?.list?.map((room) => (
                          <li
                            key={room._id}
                            onClick={() => setRoomId(room._id)}
                          >
                            {room.roomName}
                          </li>
                        ))}
                        <li onClick={() => setRoomId("")}>Hu??? ch???n</li>
                      </ul>
                      <button className="sign__select-icon">
                        <i
                          className={`fas fa-chevron-${
                            showRoomList ? "up" : "down"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </OutsideHandler>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-6">
                <div className="sign__group">
                  <p className="label font-weight-bold mb-1">Gi??? chi???u</p>
                  <OutsideHandler callback={() => setShowSlotList(false)}>
                    <div
                      className={`sign-custom__select ${
                        showSlotList ? "show" : ""
                      }`}
                      onClick={() => setShowSlotList((prevState) => !prevState)}
                    >
                      <li className="gender__text">
                        {slotId
                          ? slotData?.list?.find((item) => item._id === slotId)
                              ?.slotName
                          : "Vui l??ng ch???n"}
                      </li>
                      <ul
                        className={`h-250 overflow-y-scr ${
                          showSlotList ? "show" : ""
                        }`}
                      >
                        {slotData?.list?.map((slot) => (
                          <li
                            key={slot._id}
                            onClick={() => setSlotId(slot._id)}
                          >
                            {slot.slotName}
                          </li>
                        ))}
                        <li onClick={() => setSlotId("")}>Hu??? ch???n</li>
                      </ul>
                      <button className="sign__select-icon">
                        <i
                          className={`fas fa-chevron-${
                            showSlotList ? "up" : "down"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </OutsideHandler>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-6">
                <div className="sign__group">
                  <p className="label font-weight-bold mb-1">Nh??n vi??n</p>
                  <OutsideHandler callback={() => setShowStaffList(false)}>
                    <div
                      className={`sign-custom__select ${
                        showStaffList ? "show" : ""
                      }`}
                      onClick={() =>
                        setShowStaffList((prevState) => !prevState)
                      }
                    >
                      <li className="gender__text">
                        {staffId
                          ? staffs?.list?.find((item) => item._id === staffId)
                              ?.fullname
                          : "Vui l??ng ch???n"}
                      </li>
                      <ul
                        className={`h-250 overflow-y-scr ${
                          showStaffList ? "show" : ""
                        }`}
                      >
                        {staffs?.list?.map((staff) => (
                          <li
                            key={staff._id}
                            onClick={() => setStaffId(staff._id)}
                          >
                            {staff.fullname}
                          </li>
                        ))}
                        <li onClick={() => setStaffId("")}>Hu??? ch???n</li>
                      </ul>
                      <button className="sign__select-icon">
                        <i
                          className={`fas fa-chevron-${
                            showStaffList ? "up" : "down"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </OutsideHandler>
                </div>
              </div>
            </div>
            <div className="row">
              <button
                className={`btn__outline-orange ml-3 mb-4 ${
                  isLoading ? "divDisable" : ""
                }`}
                onClick={getRevenueList}
              >
                {isLoading ? "??ang t??m ki???m" : "T??m ki???m"}
              </button>
            </div>
          </div>
          <div className="results">
            <RevenueList list={filteredList} isLoading={isLoading} />
          </div>
          {totalInfo && (
            <div className="totals my-3 text-white">
              <div className="text-white mb-2">
                <strong>T???ng s??? v?? d???a tr??n nh???ng m???c ???? ch???n : </strong>{" "}
                <span> {totalInfo?.ticket} </span>
              </div>
              <div className="text-white">
                <strong>T???ng doanh thu d???a tr??n nh???ng m???c ???? ch???n : </strong>{" "}
                <span> {formatter.format(totalInfo?.totalIncome)} </span>
              </div>
            </div>
          )}
          {/* <div className="room__paginator">
            <Paginator
              curPage={curPage}
              maxPage={Math.ceil(filteredList.length / MAX_ITEMS_PER_PAGE)}
              setCurPage={setCurPage}
              totalItems={filteredList.length}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Revenue;
