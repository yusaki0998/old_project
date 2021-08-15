/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { checkCondition } from "../../utils/helper";
import { logout } from "../../store/actions/authActions";
import logo from "../../assets/logo.png";
import ConfirmLogoutModal from "../modals/ConfirmLogout";
import { hideSidebar } from "../../store/actions/uiActions";

const Menu = () => {
  const { sidebar } = useSelector((state) => state.ui);
  const { loginData } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

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
            <span>Manager</span>
            <p className="sidebar__user-name cursor-pointer">
              {loginData?.data?.fullname}
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
              <Link to="/customer/info" className={`sidebar__nav-link`}>
                <i className="icon ion-ios-contact"></i>{" "}
                <span>Quản lý tài khoản</span>
              </Link>
            </li>
            <li className="sidebar__nav-item">
              <Link
                className={`sidebar__nav-link ${checkCondition(
                  pathname.includes("/new-film"),
                  "sidebar__nav-link--active",
                  ""
                )}`}
                to="/manager/new-film"
                onClick={() => dispatch(hideSidebar())}
              >
                <i className="icon ion-ios-add"></i>
                <span> Tạo mới phim</span>
              </Link>
            </li>
            <li className="sidebar__nav-item">
              <Link
                className={`sidebar__nav-link ${checkCondition(
                  pathname.includes("/current") || pathname === "/manager",
                  "sidebar__nav-link--active",
                  ""
                )}`}
                to="/manager/current"
                onClick={() => dispatch(hideSidebar())}
              >
                <i className="icon ion-ios-film"></i>
                <span>Phim đang chiếu</span>
              </Link>
            </li>
            <li className="sidebar__nav-item">
              <Link
                className={`sidebar__nav-link ${checkCondition(
                  pathname.includes("/coming"),
                  "sidebar__nav-link--active",
                  ""
                )}`}
                to="/manager/coming"
                onClick={() => dispatch(hideSidebar())}
              >
                <i className="icon ion-ios-videocam"></i>
                <span>Phim sắp chiếu</span>
              </Link>
            </li>
            <li className="sidebar__nav-item">
              <Link
                className={`sidebar__nav-link ${checkCondition(
                  pathname.includes("/room") ||
                    pathname.includes("/new-room") ||
                    pathname.includes("/edit-room"),
                  "sidebar__nav-link--active",
                  ""
                )}`}
                to="/manager/room"
                onClick={() => dispatch(hideSidebar())}
              >
                <i className="icon ion-ios-desktop"></i>
                <span>Phòng chiếu</span>
              </Link>
            </li>
            <li className="sidebar__nav-item">
              <Link
                className={`sidebar__nav-link ${checkCondition(
                  pathname.includes("/calendar"),
                  "sidebar__nav-link--active",
                  ""
                )}`}
                to="/manager/calendar"
                onClick={() => dispatch(hideSidebar())}
              >
                <i className="icon ion-ios-calendar"></i>
                <span>Lịch chiếu</span>
              </Link>
            </li>
            <li className="sidebar__nav-item">
              <Link
                className={`sidebar__nav-link ${checkCondition(
                  pathname.includes("/slot"),
                  "sidebar__nav-link--active",
                  ""
                )}`}
                to="/manager/slot"
                onClick={() => dispatch(hideSidebar())}
              >
                <i className="icon ion-ios-time"></i>
                <span>Giờ chiếu</span>
              </Link>
            </li>
            <li className="sidebar__nav-item">
              <Link
                className={`sidebar__nav-link ${checkCondition(
                  pathname.includes("/revenue"),
                  "sidebar__nav-link--active",
                  ""
                )}`}
                to="/manager/revenue"
                onClick={() => dispatch(hideSidebar())}
              >
                <i className="icon ion-ios-card"></i>
                <span>Doanh thu</span>
              </Link>
            </li>
            <li className="sidebar__nav-item">
              <Link
                className={`sidebar__nav-link ${checkCondition(
                  pathname.includes("/staff") ||
                    pathname.includes("/staff-info"),
                  "sidebar__nav-link--active",
                  ""
                )}`}
                to="/manager/staff"
                onClick={() => dispatch(hideSidebar())}
              >
                <i className="icon ion-ios-calculator"></i>
                <span>Thống kê</span>
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

export default Menu;
