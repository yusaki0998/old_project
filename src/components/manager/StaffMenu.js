/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { checkCondition } from "../../utils/helper";
import userImg from "../../template/styles/main/img/user.svg";
import { logout } from "../../store/actions/authActions";
import logo from "../../assets/logo.png";
import { PROD_REST_API_IMG_URL } from "../../utils/constants";
import ConfirmLogoutModal from "../modals/ConfirmLogout";

const StaffMenu = () => {
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
            <span>Staff</span>
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
                className={`sidebar__nav-link ${checkCondition(
                  pathname.includes("/customers"),
                  "sidebar__nav-link--active",
                  ""
                )}`}
                to="/staff/customers"
              >
                <i className="icon ion-ios-contacts"></i>
                <span> Khách hàng</span>
              </Link>
            </li>
            <li className="sidebar__nav-item">
              <Link
                className={`sidebar__nav-link ${checkCondition(
                  pathname.includes("/booking-ticket"),
                  "sidebar__nav-link--active",
                  ""
                )}`}
                to="/staff/booking-ticket"
              >
                <i className="icon ion-ios-contacts"></i>
                <span>Đặt phim</span>
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

export default StaffMenu;
