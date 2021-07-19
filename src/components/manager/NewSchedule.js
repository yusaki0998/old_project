/** @format */

import React, { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";
import { createScheduleRequest } from "../../store/api/manager";
import { useDispatch } from "react-redux";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";
import { v4 as uuid_v4 } from "uuid";
import OutsideHandler from "../shared/ClickWrapper";
import { dayInWeeks } from "../../utils/helper";

const NewScheduleForm = ({
  open,
  close,
  scheduleData,
  dayInWeekNum,
  allFilm,
  listRoom,
  slotId,
  selectedDate,
  fetchListScheduleHandler,
}) => {
  const [showFilmList, setShowFilmList] = useState(false);
  const [filmId, setFilm] = useState("");
  const [showRoomList, setShowRoomList] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setFilm(scheduleData?.movie?._id);
  }, [scheduleData]);

  const onValid = async () => {
    setIsLoading(true);
    try {
      const { data: dataRes } = await createScheduleRequest({
        movieId: filmId,
        roomId,
        slotId: slotId?._id,
        showDate: selectedDate,
      });
      console.log(dataRes);
      setIsLoading(false);
      fetchListScheduleHandler();
      close();
      const newNoti = {
        id: uuid_v4(),
        type: "success",
        message: "Tạo mới lịch chiếu thành công!",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      const newNoti = {
        id: uuid_v4(),
        type: "error",
        message:
          error?.response?.data?.message ||
          "Tạo mới lịch chiếu thất bại. Vui lòng thử lại!",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
    }
  };

  return (
    <>
      <Modal
        open={open}
        close={close}
        title={"Tạo mới lịch chiếu"}
        body={null}
        onConfirm={onValid}
        isLoading={isLoading}
      >
        <div className="slot__detail-modal">
          <div className="row align-items-center">
            <div className="col-md-4">
              <p> {dayInWeeks?.[dayInWeekNum]} </p>
            </div>
            <div className="col-md-4">
              <div className="sign__group">{selectedDate}</div>
            </div>
            <div className="col-md-4">
              <div className="sign__group">{slotId?.slotName}</div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Chọn phim</p>
            </div>
            <div className="col-md-8">
              <div className="sign__group">
                <OutsideHandler callback={() => setShowFilmList(false)}>
                  <div
                    className={`sign-custom__select ${
                      showFilmList ? "show" : ""
                    }`}
                    onClick={() => setShowFilmList((prevState) => !prevState)}
                  >
                    <li className="gender__text">
                      {filmId
                        ? allFilm?.find((item) => item._id === filmId)
                            ?.movieName
                        : "Vui lòng chọn"}
                    </li>
                    <ul
                      className={`h-250 overflow-y-scr ${
                        showFilmList ? "show" : ""
                      }`}
                    >
                      {allFilm?.map((film) => (
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
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Chọn phòng chiếu</p>
            </div>
            <div className="col-md-8">
              <div className="sign__group">
                <OutsideHandler callback={() => setShowRoomList(false)}>
                  <div
                    className={`sign-custom__select ${
                      showRoomList ? "show" : ""
                    }`}
                    onClick={() => setShowRoomList((prevState) => !prevState)}
                  >
                    <li className="gender__text">
                      {roomId
                        ? listRoom?.find((item) => item._id === roomId)
                            ?.roomName
                        : "Vui lòng chọn"}
                    </li>
                    <ul
                      className={`h-250 overflow-y-scr ${
                        showRoomList ? "show" : ""
                      }`}
                    >
                      {listRoom?.map((room) => (
                        <li key={room._id} onClick={() => setRoomId(room._id)}>
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
          </div>
        </div>
      </Modal>
      <Backdrop
        open={open}
        onClicked={() => {
          if (!isLoading) {
            close();
          }
        }}
      />
    </>
  );
};

export default NewScheduleForm;
