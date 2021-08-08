/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { checkCondition } from "../../utils/helper";
import { logout } from "../../store/actions/authActions";
import logo from "../../assets/logo.png";
import ConfirmLogoutModal from "../modals/ConfirmLogout";
import { hideSidebar } from "../../store/actions/uiActions";

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
        <a href="##" className="sidebar__logo">
          <img src={logo} alt="Hotflix logo" />
        </a>
        <div className="sidebar__user">
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
                )} ${checkCondition(
                  pathname.includes("/customer-detail") ||
                    pathname === "/staff",
                  "sidebar__nav-link--active",
                  ""
                )}`}
                to="/staff/customers"
                onClick={() => dispatch(hideSidebar())}
              >
                <i className="icon ion-ios-contacts"></i>
                <span> Khách hàng</span>
              </Link>
            </li>
            <li className="sidebar__nav-item">
              <Link
                className={`sidebar__nav-link ${checkCondition(
                  pathname.includes("/booking-ticket") ||
                    pathname.includes("/view-movie") ||
                    pathname.includes("/select-seat"),
                  "sidebar__nav-link--active",
                  ""
                )}`}
                to="/staff/booking-ticket"
                onClick={() => dispatch(hideSidebar())}
              >
                <i className="icon ion-ios-videocam"></i>
                <span>Đặt phim</span>
              </Link>
            </li>
            <li className="sidebar__nav-item">
              <Link
                className={`sidebar__nav-link ${checkCondition(
                  pathname.includes("/ticket-history"),
                  "sidebar__nav-link--active",
                  ""
                )}`}
                to="/staff/ticket-history"
                onClick={() => dispatch(hideSidebar())}
              >
                <i className="icon ion-ios-calendar"></i>
                <span>Lịch sử vé</span>
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
