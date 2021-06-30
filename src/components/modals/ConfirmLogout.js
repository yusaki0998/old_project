/** @format */

import React from "react";
import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";

const ConfirmLogoutModal = ({ open, close, onConfirm }) => {
  return (
    <>
      <Modal
        open={open}
        close={close}
        title="Đăng xuất"
        body={`Bạn có chắc muốn đăng xuất tài khoản?`}
        onConfirm={onConfirm}
      />
      <Backdrop open={open} onClicked={close} />
    </>
  );
};

export default ConfirmLogoutModal;
