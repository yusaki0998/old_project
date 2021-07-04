/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { checkCondition } from "../../utils/helper";
import userImg from "../../template/styles/main/img/user.svg";
import { logout } from "../../store/actions/authActions";
import logo from "../../template/styles/main/img/logo.svg";
import { PROD_REST_API_IMG_URL } from "../../utils/constants";
import ConfirmLogoutModal from "../modals/ConfirmLogout";

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
        <a href="/" className="sidebar__logo">
          <img src={logo} alt="Hotflix logo" />
        </a>
        <div className="sidebar__user">
          <div className="sidebar__user-img">
            <img
              className="user__img-wrapper"
              src={
                loginData?.data?.avatar
                  ? `${PROD_REST_API_IMG_URL}${loginData?.data?.avatar?.replace(
                      "../uploads",
                      ""
                    )}`
                  : userImg
              }
              alt={loginData?.data?.fullname}
            />
          </div>

          <div className="sidebar__user-title">
            <span>Manager</span>
            <p className="sidebar__user-name">{loginData?.data?.fullname}</p>
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
                onClick={() => history.push("/manager/new-film?from=current")}
                className={`sidebar__nav-link ${checkCondition(
                  pathname.includes("/new-film"),
                  "sidebar__nav-link--active",
                  ""
                )}`}
                to="/manager/new-film"
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
              >
                <i className="icon ion-ios-man"></i>
                <span>Slot chiếu</span>
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
              >
                <i className="icon ion-ios-card"></i>
                <span>Doanh thu</span>
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
