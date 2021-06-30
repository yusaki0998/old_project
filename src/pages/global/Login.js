/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../store/actions/authActions";
import logo from "../../template/styles/main/img/logo.svg";
import section from "../../template/styles/main/img/section/section.jpg";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.auth);

  const onValid = (data) => {
    dispatch(login(data, history));
  };
  return (
    <div className="sign section--bg" data-bg={section}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              <form onSubmit={handleSubmit(onValid)} className="sign__form">
                <Link to="/" className="sign__logo">
                  <img src={logo} alt="Hotflix" />
                </Link>

                <div className="sign__group">
                  <input
                    type="text"
                    className={`sign__input ${
                      errors.email ? "input-error" : ""
                    }`}
                    placeholder="Email"
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

                <div className="sign__group">
                  <input
                    type="password"
                    className={`sign__input ${
                      errors.password ? "input-error" : ""
                    }`}
                    placeholder="Mật khẩu"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Đây là mục bắt buộc",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="input-required">{errors.password.message}</p>
                  )}
                </div>

                <div className="sign__group sign__group--checkbox">
                  <input id="remember" name="remember" type="checkbox" />
                  <label htmlFor="remember">Nhớ mật khẩu</label>
                </div>

                <button
                  className={`sign__btn ${
                    loginData.isLoading ? "divDisable" : ""
                  }`}
                  type="submit"
                >
                  {loginData.isLoading ? "Đang đăng nhập" : "Đăng nhập"}
                </button>

                <span className="sign__text">
                  Chưa có tài khoản? <Link to="/signup">Đăng ký!</Link>
                </span>

                <span className="sign__text">
                  <Link to="/forgot">Quên mật khẩu?</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
