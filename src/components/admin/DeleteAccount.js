/** @format */

import React, { useState } from "react";
import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";
import { deleteAccountRequest } from "../../store/api/admin";
import { useDispatch } from "react-redux";
import { removeAccountFromState } from "../../store/actions/adminActions";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";
import { v4 as uuid_v4 } from "uuid";

const DeleteAccount = ({ open, close, userData }) => {
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

  const onConfirm = async () => {
    setIsLoading(true);
    try {
      await deleteAccountRequest(userData?._id);
      dispatch(removeAccountFromState(userData?._id, userData?.role));
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
          "Xóa tài khoản thất bại. Vui lòng thử lại!",
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
        title="Xóa tài khoản"
        body={
          userData?.role === "manager"
            ? `Bạn có chắc muốn xóa quản lý ${userData?.fullname || ""}`
            : `Bạn có chắc muốn xóa nhân viên ${userData?.fullname || ""}`
        }
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

export default DeleteAccount;
