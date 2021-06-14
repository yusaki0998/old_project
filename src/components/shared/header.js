/** @format */

import React from "react";
import "../../template/styles/main/index.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../../template/styles/main/img/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/authActions";

const Header = () => {
  const { loginData, isAuthenticated } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="header__content">
              <Link to="/" className="header__logo">
                <img src={logo} alt="Hotflix logo" />
              </Link>

              <ul className="header__nav">
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/catalog">
                    Catalog
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link to="/pricing" className="header__nav-link">
                    Pricing plan
                  </Link>
                </li>
                <li className="dropdown header__nav-item">
                  <button
                    className="dropdown-toggle header__nav-link header__nav-link--more"
                    id="dropdownMenuMore"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="icon ion-ios-more"></i>
                  </button>

                  <ul
                    className="dropdown-menu header__dropdown-menu scrollbar-dropdown min-height-420"
                    aria-labelledby="dropdownMenuMore"
                  >
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/contacts">Contacts</Link>
                    </li>
                    <li>
                      <Link to="/faq">Help center</Link>
                    </li>
                    <li>
                      <Link to="/privacy">Privacy policy</Link>
                    </li>
                    <li>
                      <Link to="/../admin/index" target="_blank">
                        Admin pages
                      </Link>
                    </li>
                    <li>
                      <Link to="/signin">Sign in</Link>
                    </li>
                    <li>
                      <Link to="/signup">Sign up</Link>
                    </li>
                    <li>
                      <Link to="/forgot">Forgot password</Link>
                    </li>
                    <li>
                      <Link to="/404">404 Page</Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <div
                className={`header__auth d-flex justify-content-end ${
                  loginData?.data?.role === "admin" ? "isAdmin" : ""
                }`}
              >
                {/* <form action="#" className="header__search">
                  <input
                    className="header__search-input"
                    type="text"
                    placeholder="Search..."
                  />
                  <button className="header__search-button" type="button">
                    <i className="icon ion-ios-search"></i>
                  </button>
                  <button className="header__search-close" type="button">
                    <i className="icon ion-md-close"></i>
                  </button>
                </form>

                <button className="header__search-btn" type="button">
                  <i className="icon ion-ios-search"></i>
                </button> */}
                {isAuthenticated ? (
                  <>
                    {loginData?.data?.role === "admin" && (
                      <button
                        className="header__nav-link text-white mr-3"
                        onClick={() => history.push("/admin")}
                      >
                        Dashboard
                      </button>
                    )}
                    <button
                      className="header__nav-link text-white"
                      onClick={() => history.push("/customer/info")}
                    >
                      <i className="icon ion-ios-contacts f-22 mr-2"></i>
                      {loginData?.data?.fullname}
                    </button>
                    <Link
                      to="/signin"
                      className="header__sign-in"
                      onClick={() => dispatch(logout())}
                    >
                      <i className="icon ion-ios-log-out"></i>
                      <span>Logout</span>
                    </Link>
                  </>
                ) : (
                  <Link to="/signin" className="header__sign-in">
                    <i className="icon ion-ios-log-in"></i>
                    <span>sign in</span>
                  </Link>
                )}
              </div>
              <button className="header__btn" type="button">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
