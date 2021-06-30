/** @format */

import React, { useState } from "react";
import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";
import { deteleSlotRequest } from "../../store/api/manager";
import { useDispatch } from "react-redux";
import { removeSlotFromState } from "../../store/actions/managerActions";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";
import { v4 as uuid_v4 } from "uuid";

const DeleteSlot = ({ open, close, slotData }) => {
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

  const onConfirm = async () => {
    setIsLoading(true);
    try {
      await deteleSlotRequest(slotData?._id);
      dispatch(removeSlotFromState(slotData?._id));
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
        title="Xóa slot"
        body={`Bạn có chắc muốn xóa slot '${slotData.slotName || ""}'`}
        onConfirm={onConfirm}
        isLoading={isLoading}
      ></Modal>
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

export default DeleteSlot;
