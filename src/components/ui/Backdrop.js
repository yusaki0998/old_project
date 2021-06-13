import React from "react";
import ReactDOM from "react-dom";
import "../styles/ui.css";

const Backdrop = ({ open, onClicked }) => {
  const backdropDomNode = document.getElementById("backdrop");
  return ReactDOM.createPortal(
    <div
      className={`c__backdrop ${open ? "show" : ""}`}
      onClick={onClicked}
    ></div>,
    backdropDomNode
  );
};

export default Backdrop;
