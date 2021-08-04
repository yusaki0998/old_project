/** @format */

import React, { useEffect, useState } from "react";
import "../styles/global.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Helmet } from "react-helmet";

const ConfirmOTP = () => {
  const { search } = useLocation();
  const [otp, setOtp] = useState("");
  const history = useHistory();

  const query = new URLSearchParams(search);
  const emailField = query.get("email");

  useEffect(() => {
    if (!emailField) {
      history.push("/signup");
    }
  }, [history, emailField]);

  return (
    <div className="confirm__otp">
      <Helmet>
        <title> Xác nhận mã OTP </title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="mx-auto">
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
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <p className="confirm__otp-text text-white">
                Mã xác thực đã được gửi đến email {emailField}.
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

export default ConfirmOTP;
