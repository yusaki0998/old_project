/** @format */

import React, { useState } from "react";
import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";
import { deteleRoomRequest } from "../../store/api/manager";
import { useDispatch } from "react-redux";
import { removeRoomFromState } from "../../store/actions/managerActions";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";
import { v4 as uuid_v4 } from "uuid";

const DeleteRoom = ({ open, close, roomData }) => {
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

  const onConfirm = async () => {
    setIsLoading(true);
    try {
      await deteleRoomRequest(roomData?._id);
      dispatch(removeRoomFromState(roomData?._id));
      setIsLoading(false);
      close();
    } catch (error) {
      setIsLoading(false);
      close();
      const newNoti = {
        id: uuid_v4(),
        type: "error",
        message:
          error?.response?.data?.message ||
          "Xóa phòng chiếu thất bại. Vui lòng thử lại!",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 5000);
    }
  };

  return (
    <>
      <Modal
        open={open}
        close={close}
        title="Xóa phòng chiếu"
        body={`Bạn có chắc muốn xóa phòng chiếu '${roomData.roomName || ""}'`}
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

export default DeleteRoom;
