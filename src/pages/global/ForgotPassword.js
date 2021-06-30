/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from "../../template/styles/main/img/logo.svg";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = (data) => {
    console.log(data);
  };

  return (
    <div className="sign">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              <form className="sign__form" onSubmit={handleSubmit(onValid)}>
                <a href="/" className="sign__logo">
                  <img src={logo} alt="Hotflix" />
                </a>

                <div className="sign__group">
                  <p className="text-white">Nhập số điện thoại</p>
                  <input
                    type="text"
                    className={`sign__input ${
                      errors.phone ? "input-error" : ""
                    }`}
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "Đây là mục bắt buộc",
                      },
                      minLength: {
                        value: "10",
                        message: "Số điện thoại phải bao gồm ít nhất 10 chữ số",
                      },
                      pattern: {
                        value: /^\d+$/,
                        message: "Số điện thoại phải là chữ số",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="input-required">{errors.phone.message}</p>
                  )}
                </div>

                <div className="sign__group sign__group--checkbox">
                  <input id="remember" name="remember" type="checkbox" />
                  <label htmlFor="remember">
                    Tôi đồng ý với{" "}
                    <Link to="/privacy"> Điều khoản & Chính sách</Link>
                  </label>
                </div>

                <button className="sign__btn" type="submit">
                  Xác nhận
                </button>

                <span className="sign__text">
                  Mã OTP sẽ được gửi tới số điện thoại này
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
