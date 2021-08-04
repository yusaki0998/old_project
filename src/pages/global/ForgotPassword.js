/** @format */

import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  const onValid = (data) => {
    history.push(`/confirm-otp?email=${data.email}`);
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

                <button className="sign__btn" type="submit">
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
