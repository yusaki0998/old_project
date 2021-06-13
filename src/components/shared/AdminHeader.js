import React from "react";
import logo from "../../template/styles/main/img/logo.svg";

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <div className="admin-header__content">
        <a href="/" className="admin-header__logo">
          <img src={logo} alt="" />
        </a>
        <button
          className="admin-header__btn admin-header__btn-admin"
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
