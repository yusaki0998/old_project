/** @format */

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.png";
import { verifyRegisterRequest } from "../../store/api/auth";
import { useDispatch } from "react-redux";
import { v4 as uuid_v4 } from "uuid";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const verifyHandler = async () => {
    setIsLoading(true);
    try {
      const { data } = await verifyRegisterRequest(token);
      const newNoti = {
        id: uuid_v4(),
        type: "success",
        message:
          data?.message || "Xác thực e-mail thành công. Vui lòng đăng nhập!",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
      history.push("/signin");
    } catch (error) {
      const newNoti = {
        id: uuid_v4(),
        type: "error",
        message:
          error?.response?.data?.message ||
          "Xác thực e-mail thất bại. Vui lòng thử lại!",
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
        <title> Xác nhận đăng ký </title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4 col-md-6 col-sm-8 mx-auto">
            <form className="sign__form mt-5">
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
              <button
                className={`sign__btn ${token ? "" : "divDisable"} ${
                  isLoading ? "divDisable" : ""
                }`}
                type="button"
                onClick={verifyHandler}
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

export default VerifyEmail;
