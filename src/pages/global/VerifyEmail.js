/** @format */

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  return (
    <div className="confirm__otp">
      <Helmet>
        <title> Xác nhận đăng ký </title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4 col-md-6 col-sm-8 mx-auto">
            <form className="sign__form">
              <Link to="/" className="sign__logo sign__link">
                <img src={logo} alt="Hotflix" />
              </Link>
              <div className="sign__group">
                <label htmlFor="otp__code" className="sign__label text-white">
                  Nhập mã xác thực
                </label>
                <input
                  id="otp__code"
                  type="text"
                  className="sign__input"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
              <p className="confirm__otp-text text-white">
                Mã xác minh này đã được gửi đến email bạn đăng ký tài khoản.
                <br />
              </p>
              <button className="sign__btn" type="button">
                Xác nhận
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
