/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "../styles/ui.css";

const Modal = ({ open, close, title, body, onConfirm, isLoading }) => {
  const modalDomNode = document.getElementById("modal");

  return ReactDOM.createPortal(
    <div className={`zoom-anim-dialog c__modal ${open ? "show" : ""}`}>
      <h6 className="modal__title">{title}</h6>
      <p className="modal__text">{body}</p>
      <div className="modal__btns">
        <button
          className={`modal__btn modal__btn--apply ${
            isLoading ? "divDisable" : ""
          }`}
          type="button"
          onClick={onConfirm}
        >
          Đồng ý
        </button>
        <button
          className={`modal__btn modal__btn--dismiss ${
            isLoading ? "divDisable" : ""
          }`}
          type="button"
          onClick={close}
        >
          Hủy bỏ
        </button>
      </div>
    </div>,
    modalDomNode
  );
};

export default Modal;
