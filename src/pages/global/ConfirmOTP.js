/** @format */

import React, { useEffect, useState } from "react";
import "../styles/global.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../template/styles/main/img/logo.svg";

const ConfirmOTP = () => {
  const { search } = useLocation();
  const [otp, setOtp] = useState("");
  const history = useHistory();

  const query = new URLSearchParams(search);
  const phoneField = query.get("phone");

  useEffect(() => {
    if (!phoneField) {
      history.push("/signup");
    }
  }, [history, phoneField]);

  return (
    <div className="confirm__otp">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4 col-md-6 col-sm-8 mx-auto">
            <form>
              <Link to="/" className="sign__logo sign__link">
                <img src={logo} alt="Hotflix" />
              </Link>
              <div className="sign__group">
                <label htmlFor="otp__code" className="sign__label">
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
              <p className="confirm__otp-text">
                Mã xác minh OTP đã được gửi đến số điện thoại {phoneField}.
                <br />
                Bạn chỉ có thể nhận tối đa 3 mã/1 ngày
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
