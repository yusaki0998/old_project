/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListRoom,
  getListCurrentFilm,
  getListSlot,
} from "../../store/actions/managerActions";
import { getListStaff } from "../../store/actions/adminActions";
import Paginator from "../../components/shared/Paginator";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OutsideHandler from "../../components/shared/ClickWrapper";
import { getRevenueListRequest } from "../../store/api/manager";
import RevenueList from "../../components/manager/RevenueList";

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

const FilmRoom = () => {
  const dispatch = useDispatch();
  const {
    room: roomData,
    currentFilm,
    slot: slotData,
  } = useSelector((state) => state.manager);
  const { staffs } = useSelector((state) => state.admin);
  const [filteredList, setFilteredList] = useState([]);
  const [curPage, setCurPage] = useState(0);
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
      setFilteredList(data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tab-pane">
      <Helmet>
        <title>Báo Cáo Doanh thu </title>
      </Helmet>
      <div className="row">
        <div className="col-12">
          <h3 className="text-white mt-3">Báo Cáo Doanh Thu</h3>
          <div className="filter__engine text-white">
            <div className="row">
              <div className="col-md-3 col-6">
                <div className="sign__group">
                  <p className="label font-weight-bold mb-1">Từ ngày</p>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="sign__group">
                  <p className="label font-weight-bold mb-1">Đến ngày</p>
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
                          : "Vui lòng chọn"}
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
                  <p className="label font-weight-bold mb-1">Phòng</p>
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
                          : "Vui lòng chọn"}
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
                  <p className="label font-weight-bold mb-1">Giờ chiếu</p>
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
                          : "Vui lòng chọn"}
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
                  <p className="label font-weight-bold mb-1">Nhân viên</p>
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
                              ?.staffName
                          : "Vui lòng chọn"}
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
                {isLoading ? "Đang tìm kiếm" : "Tìm kiếm"}
              </button>
            </div>
          </div>
          <div className="results">
            <RevenueList list={filteredList} isLoading={isLoading} />
          </div>
          <div className="room__paginator">
            <Paginator
              curPage={curPage}
              maxPage={Math.ceil(filteredList.length / MAX_ITEMS_PER_PAGE)}
              setCurPage={setCurPage}
              totalItems={filteredList.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmRoom;
