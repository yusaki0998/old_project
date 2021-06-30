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
                        message: "This is required field",
                      },
                      minLength: {
                        value: "10",
                        message:
                          "Phone number must be contains at least 10 number characters",
                      },
                      pattern: {
                        value: /^\d+$/,
                        message: "Phone number must be number characters",
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
                    I agree to the <Link to="/privacy">Privacy Policy</Link>
                  </label>
                </div>

                <button className="sign__btn" type="submit">
                  Xác nhận
                </button>

                <span className="sign__text">
                  We will send a OTP code to your phone
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
