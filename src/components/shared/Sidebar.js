/** @format */

import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../styles/sidebar.css";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/authActions";
import ConfirmLogoutModal from "../modals/ConfirmLogout";
import { hideSidebar } from "../../store/actions/uiActions";

const Sidebar = ({ userInfo }) => {
  const { pathname, search } = useLocation();
  const { sidebar } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const history = useHistory();

  const query = new URLSearchParams(search);
  const roleField = query.get("role");

  const [showLogout, setShowLogout] = useState(false);

  const openShowLogout = () => setShowLogout(true);

  const closeShowLogout = () => setShowLogout(false);

  return (
    <>
      <div className={`sidebar ${sidebar.show ? "show" : ""}`}>
        <a href="##" className="sidebar__logo">
          <img src={logo} alt="Hotflix logo" />
        </a>
        <div className="sidebar__user">
          <div className="sidebar__user-title">
            <span>Admin</span>
            <p className="sidebar__user-name cursor-pointer">
              {userInfo?.fullname}
            </p>
          </div>
          <button
            className="sidebar__user-btn"
            type="button"
            onClick={openShowLogout}
          >
            <i className="icon ion-ios-log-out"></i>
          </button>
        </div>
        <div className="sidebar__nav-wrap">
          <ul className="sidebar__nav">
            <li className="sidebar__nav-item">
              <Link
                to="/admin/create-account"
                className={`sidebar__nav-link ${
                  pathname.includes("/create-account")
                    ? "sidebar__nav-link--active"
                    : ""
                }`}
                onClick={() => dispatch(hideSidebar())}
              >
                <i className="icon ion-ios-create"></i>
                <span>Tạo tài khoản</span>
              </Link>
            </li>
            <li className="sidebar__nav-item">
              <Link
                to="/admin/employees"
                className={`sidebar__nav-link ${
                  pathname.includes("/employees") ||
                  (roleField === "staff" && pathname.includes("/edit-account"))
                    ? "sidebar__nav-link--active"
                    : ""
                }`}
                onClick={() => dispatch(hideSidebar())}
              >
                <i className="icon ion-ios-contact"></i> <span>Nhân viên</span>
              </Link>
            </li>
            <li className="sidebar__nav-item">
              <Link
                to="/admin/managers"
                className={`sidebar__nav-link ${
                  pathname.includes("/managers") ||
                  (roleField === "manager" &&
                    pathname.includes("/edit-account"))
                    ? "sidebar__nav-link--active"
                    : ""
                }`}
                onClick={() => dispatch(hideSidebar())}
              >
                <i className="icon ion-ios-contact"></i> <span>Quản lý</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <ConfirmLogoutModal
        open={showLogout}
        close={closeShowLogout}
        onConfirm={() => {
          dispatch(logout());
          closeShowLogout();
          history.push("/");
        }}
      />
    </>
  );
};

export default Sidebar;
