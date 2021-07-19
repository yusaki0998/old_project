/** @format */

import React, { useState } from "react";
import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";
import { useDispatch } from "react-redux";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";
import { v4 as uuid_v4 } from "uuid";
import { cancelBookingRequest } from "../../store/api/global";

const CancelBooking = ({ open, close, ticketData, callback }) => {
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

  const onConfirm = async () => {
    setIsLoading(true);
    try {
      await cancelBookingRequest(ticketData?._id);
      setIsLoading(false);
      callback();
      const newNoti = {
        id: uuid_v4(),
        type: "success",
        message: "Hủy vé thành côngư!",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
      close();
    } catch (error) {
      setIsLoading(false);
      close();
      const newNoti = {
        id: uuid_v4(),
        type: "error",
        message:
          error?.response?.data?.message ||
          "Hủy vé thất bại. Vui lòng thử lại!",
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
        title="Hủy vé phim"
        body={`Bạn có chắc muốn hủy vé phim`}
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

export default CancelBooking;
