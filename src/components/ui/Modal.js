import React from "react";
import ReactDOM from "react-dom";
import "../styles/ui.css";

const Modal = ({ open, close, title, body }) => {
  const modalDomNode = document.getElementById("modal");
  return ReactDOM.createPortal(
    <div className={`zoom-anim-dialog c__modal ${open ? "show" : ""}`}>
      <h6 className="modal__title">{title}</h6>

      <p className="modal__text">{body}</p>

      <div className="modal__btns">
        <button
          className="modal__btn modal__btn--apply"
          type="button"
          onClick={close}
        >
          Confirm
        </button>
        <button
          className="modal__btn modal__btn--dismiss"
          type="button"
          onClick={close}
        >
          Dismiss
        </button>
      </div>
    </div>,
    modalDomNode
  );
};

export default Modal;
