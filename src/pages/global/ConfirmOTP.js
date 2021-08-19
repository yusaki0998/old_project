/** @format */

import React, { useEffect, useState } from "react";
import "../styles/global.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { v4 as uuid_v4 } from "uuid";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";
import { resetPasswordRequest } from "../../store/api/auth";

const ConfirmOTP = () => {
  const { search } = useLocation();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const query = new URLSearchParams(search);
  const emailField = query.get("email");

  useEffect(() => {
    if (!emailField) {
      history.push("/signup");
    }
  }, [history, emailField]);

  const resetPasswordHandler = async () => {
    setIsLoading(true);
    try {
      const { data: dataRes } = await resetPasswordRequest(otp, {
        newPassword,
        retypePassword,
      });
      const newNoti = {
        id: uuid_v4(),
        type: "success",
        message: dataRes?.message || "Đổi mật khẩu thành công!",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
      history.push(`/singin`);
    } catch (error) {
      const newNoti = {
        id: uuid_v4(),
        type: "error",
        message:
          error?.response?.data?.message ||
          "Đổi mật khẩu thất bại. Vui lòng thử lại!",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

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
              <div className="sign__group">
                <label htmlFor="otp__code" className="sign__label text-white">
                  Nhập mật khẩu mới
                </label>
                <input
                  type="password"
                  className="sign__input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="sign__group">
                <label htmlFor="otp__code" className="sign__label text-white">
                  Nhập lại mật khẩu mới
                </label>
                <input
                  type="password"
                  className="sign__input"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
              </div>
              <p className="confirm__otp-text text-white">
                Mã xác thực đã được gửi đến email {emailField}.
              </p>
              <button
                className={`sign__btn ${isLoading ? "divDisable" : ""}`}
                type="button"
                onClick={resetPasswordHandler}
              >
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
