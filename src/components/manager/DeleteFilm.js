/** @format */

import React, { useState } from "react";
import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";
import { deteleFilmRequest } from "../../store/api/manager";
import { useDispatch } from "react-redux";
import { removeFilmFromState } from "../../store/actions/managerActions";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";
import { v4 as uuid_v4 } from "uuid";

const DeleteFilm = ({ open, close, filmData, from }) => {
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

  const onConfirm = async () => {
    setIsLoading(true);
    try {
      await deteleFilmRequest(filmData?._id);
      dispatch(removeFilmFromState(filmData?._id, from));
      setIsLoading(false);
      close();
      const newNoti = {
        id: uuid_v4(),
        type: "success",
        message: "Xóa phim thành công!",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      close();
      const newNoti = {
        id: uuid_v4(),
        type: "error",
        message:
          error?.response?.data?.message ||
          "Xóa phim thất bại. Vui lòng thử lại!",
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
        title="Xóa phim"
        body={`Bạn có chắc muốn xóa phim '${filmData.movieName || ""}'`}
        onConfirm={onConfirm}
        isLoading={isLoading}
      />
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

export default DeleteFilm;
