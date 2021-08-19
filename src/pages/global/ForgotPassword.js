/** @format */

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import { getForgotPasswordTokenRequest } from "../../store/api/auth";
import { v4 as uuid_v4 } from "uuid";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onValid = async (data) => {
    setIsLoading(true);
    try {
      const { data: dataRes } = await getForgotPasswordTokenRequest(data);
      const newNoti = {
        id: uuid_v4(),
        type: "success",
        message: dataRes?.message || "Mã xác thực đã được gửi tới e-mail này!",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
      history.push(`/confirm-otp?email=${data.email}`);
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
    <div className="sign">
      <Helmet>
        <title> Quên mật khẩu </title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              <form
                className="sign__form mt-5"
                onSubmit={handleSubmit(onValid)}
              >
                <a href="/" className="sign__logo">
                  <img src={logo} alt="Hotflix" />
                </a>
                <div className="sign__group">
                  <p className="text-white">Nhập email</p>
                  <input
                    type="text"
                    className={`sign__input ${
                      errors.email ? "input-error" : ""
                    }`}
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Đây là mục bắt buộc",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="input-required">{errors.email.message}</p>
                  )}
                </div>

                <button
                  className={`sign__btn ${isLoading ? "divDisable" : ""}`}
                  type="submit"
                >
                  Xác nhận
                </button>
                <span className="sign__text">
                  Đã có tài khoản? <Link to="/signin">Đăng nhập!</Link>
                </span>
                <span className="sign__text">
                  Mã xác thực sẽ được gửi tới email này
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
