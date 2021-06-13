import React from "react";

const StatusModal = () => {
  return (
    <div id="modal-status" className="zoom-anim-dialog mfp-hide modal">
      <h6 className="modal__title">Status change</h6>

      <p className="modal__text">
        Are you sure about immediately change status?
      </p>

      <div className="modal__btns">
        <button className="modal__btn modal__btn--apply" type="button">
          Apply
        </button>
        <button className="modal__btn modal__btn--dismiss" type="button">
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default StatusModal;
