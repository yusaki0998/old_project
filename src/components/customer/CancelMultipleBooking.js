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

const CancelMultipleBooking = ({ open, close, ticketDatas, callback }) => {
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

  const onConfirm = async () => {
    setIsLoading(true);
    try {
      const data = await cancelBookingRequest(ticketDatas.map((id) => id));
      console.log(data);
      setIsLoading(false);
      callback();
      const newNoti = {
        id: uuid_v4(),
        type: "success",
        message: "Hủy đặt ghế thành công!",
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
          "Hủy đặt ghế thất bại. Vui lòng thử lại!",
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
        title="Hủy các ghế đã chọn"
        body={`Bạn có chắc muốn hủy các ghế đã chọn`}
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

export default CancelMultipleBooking;
