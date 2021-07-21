/** @format */

import React, { useState } from "react";
import "../../template/styles/main/index.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/authActions";
import { checkCondition } from "../../utils/helper";
import { hideSidebar, showSidebar } from "../../store/actions/uiActions";
import ConfirmLogoutModal from "../modals/ConfirmLogout";

const Header = ({ hideCenterDiv, isActive }) => {
  const { loginData, isAuthenticated } = useSelector((state) => state.auth);
  const { sidebar } = useSelector((state) => state.ui);
  const history = useHistory();
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();
  const query = new URLSearchParams(search);
  const fromField = query.get("from");

  const [showLogout, setShowLogout] = useState(false);

  const openShowLogout = () => setShowLogout(true);

  const closeShowLogout = () => setShowLogout(false);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="header__content">
                <Link to="/" className="header__logo">
                  <img src={logo} alt="Hotflix logo" />
                </Link>
                <ul
                  className={`header__nav ${
                    sidebar.show ? "header__nav--active" : ""
                  } ${hideCenterDiv ? "d-none" : ""}`}
                >
                  <li className="header__nav-item">
                    <Link
                      className={`header__nav-link ${
                        pathname === "/" ? "header__nav-link--active" : ""
                      }`}
                      to="/"
                      onClick={() => dispatch(hideSidebar())}
                    >
                      Trang chủ
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      className={`header__nav-link ${
                        pathname.includes("/current-film") || fromField === "1"
                          ? "header__nav-link--active"
                          : ""
                      }`}
                      to="/current-film"
                      onClick={() => dispatch(hideSidebar())}
                    >
                      Phim đang chiếu
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      to="/coming-film"
                      className={`header__nav-link ${
                        pathname.includes("/coming-film") || fromField === "0"
                          ? "header__nav-link--active"
                          : ""
                      }`}
                      onClick={() => dispatch(hideSidebar())}
                    >
                      Phim sắp chiếu
                    </Link>
                  </li>
                </ul>
                <div
                  className={`header__auth d-flex justify-content-end ${
                    loginData?.data?.role === "admin" ||
                    loginData?.data?.role === "manager" ||
                    loginData?.data?.role === "staff"
                      ? "isAdmin"
                      : ""
                  }`}
                >
                  {isAuthenticated ? (
                    <>
                      {(loginData?.data?.role === "admin" ||
                        loginData?.data?.role === "manager" ||
                        loginData?.data?.role === "staff") && (
                        <button
                          className={`header__nav-link text-white mr-3 ${checkCondition(
                            isActive,
                            "header__nav-link--active",
                            ""
                          )}`}
                          onClick={() =>
                            history.push(`/${loginData?.data?.role}`)
                          }
                        >
                          Quản trị
                        </button>
                      )}
                      <button
                        className={`header__nav-link text-white ${checkCondition(
                          window.location.pathname.includes("/customer/info"),
                          "header__nav-link--active",
                          ""
                        )}`}
                        onClick={() => history.push("/customer/info")}
                      >
                        <i className="icon ion-ios-contact f-22 mr-2"></i>
                        {loginData?.data?.fullname}
                      </button>
                      <button
                        className="header__sign-in"
                        onClick={openShowLogout}
                      >
                        <i className="icon ion-ios-log-out"></i>
                        <span>Đăng xuất</span>
                      </button>
                    </>
                  ) : (
                    <Link to="/signin" className="header__sign-in">
                      <i className="icon ion-ios-log-in"></i>
                      <span>Đăng nhập</span>
                    </Link>
                  )}
                </div>
                <button
                  className={`header__btn ${
                    sidebar.show ? "header__btn--active" : ""
                  }`}
                  type="button"
                  onClick={() => {
                    if (sidebar.show) {
                      dispatch(hideSidebar());
                    } else {
                      dispatch(showSidebar());
                    }
                  }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
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

export default Header;
