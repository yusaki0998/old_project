/** @format */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = {
  onOpen: (props) => console.log(props.foo),
  onClose: (props) => console.log(props.foo),
  autoClose: 5000,
  position: toast.POSITION.TOP_CENTER,
};

const Notification = () => {
  const { notiList } = useSelector((state) => state.ui);

  useEffect(() => {
    if (notiList.length > 0) {
      notiList.forEach((element) => {
        if (element.type === "error") {
          toast.error(element.message, options);
        }
        if (element.type === "info") {
          toast.info(element.message, options);
        }
        if (element.type === "success") {
          toast.success(element.message, options);
        }
      });
    }
    // eslint-disable-next-line
  }, [notiList]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Notification;
