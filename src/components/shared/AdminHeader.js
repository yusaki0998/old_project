/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSidebar, hideSidebar } from "../../store/actions/uiActions";
import logo from "../../assets/logo.png";

const AdminHeader = () => {
  const { sidebar } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return (
    <header className="admin-header">
      <div className="admin-header__content">
        <a href="/" className="admin-header__logo">
          <img src={logo} alt="Hotflix" />
        </a>
        {!sidebar.show ? (
          <button
            className="admin-header__btn admin-header__btn-admin"
            type="button"
            onClick={() => {
              dispatch(showSidebar());
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        ) : (
          <button
            className="header__search-close"
            type="button"
            onClick={() => dispatch(hideSidebar())}
          >
            <i className="icon ion-md-close"></i>
          </button>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
