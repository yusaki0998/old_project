/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import logo from "../../template/styles/main/img/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { signup } from "../../store/actions/authActions";
import OutsideHandler from "../../components/shared/ClickWrapper";
import { Helmet } from "react-helmet";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showGender, setShowGender] = useState(false);
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();
  const { signUp } = useSelector((state) => state.auth);
  const history = useHistory();

  const optionListMarkup = (startNum, endNum) => {
    const options = [];
    // eslint-disable-next-line no-plusplus
    for (let i = startNum; i <= endNum; i++) {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const onValid = (data) => {
    const dob = `${data.birthMonth}/${data.birthDay}/${data.birthYear}`;
    delete data.birthMonth;
    delete data.birthDay;
    delete data.birthYear;
    dispatch(
      signup(
        {
          ...data,
          dob,
          gender,
        },
        history
      )
    );
  };

  return (
    <div className="sign">
      <Helmet>
        <title> Đăng ký </title>
      </Helmet>
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
                      errors.fullname ? "input-error" : ""
                    }`}
                    placeholder="Họ tên"
                    {...register("fullname", {
                      required: {
                        value: true,
                        message: "Đây là mục bắt buộc",
                      },
                    })}
                  />
                  {errors.fullname && (
                    <p className="input-required">{errors.fullname.message}</p>
                  )}
                </div>
                <div className="sign__group">
                  <input
                    type="text"
                    className={`sign__input ${
                      errors.phone ? "input-error" : ""
                    }`}
                    placeholder="Số điện thoại"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "Đây là mục bắt buộc",
                      },
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Vui lòng nhập chữ số",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="input-required">{errors.phone.message}</p>
                  )}
                </div>
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
                    autoComplete="false"
                  />
                  {errors.password && (
                    <p className="input-required">{errors.password.message}</p>
                  )}
                </div>
                <div className="sign__group">
                  <input
                    type="password"
                    className={`sign__input ${
                      errors.retype ? "input-error" : ""
                    }`}
                    placeholder="Nhập lại mật khẩu"
                    {...register("retype", {
                      required: {
                        value: true,
                        message: "Đây là mục bắt buộc",
                      },
                      validate: (value) =>
                        watch("password") === value || "Mật khẩu không khớp",
                    })}
                    autoComplete="false"
                  />
                  {errors.retype && (
                    <p className="input-required">{errors.retype.message}</p>
                  )}
                </div>
                <div className="sign__birthDate w-100 text-white">
                  <p>Ngày sinh</p>
                  <div className="birthDate__row">
                    <div className="row">
                      <div className="col-4">
                        <label htmlFor="birthYear">Năm</label>
                        <div className="sign__group">
                          <select
                            className="sign__input"
                            {...register("birthYear", {
                              required: {
                                value: true,
                                message: "Đây là mục bắt buộc",
                              },
                            })}
                          >
                            {optionListMarkup(1910, 2020)}
                          </select>
                        </div>
                      </div>
                      <div className="col-4">
                        <label htmlFor="birthMonth">Tháng</label>
                        <div className="sign__group">
                          <select
                            className="sign__input"
                            {...register("birthMonth", {
                              required: {
                                value: true,
                                message: "Đây là mục bắt buộc",
                              },
                            })}
                          >
                            {optionListMarkup(1, 12)}
                          </select>
                        </div>
                      </div>
                      <div className="col-4">
                        <label htmlFor="birthDay">Ngày</label>
                        <div className="sign__group">
                          <select
                            className="sign__input"
                            {...register("birthDay", {
                              required: {
                                value: true,
                                message: "Đây là mục bắt buộc",
                              },
                            })}
                          >
                            {optionListMarkup(1, 31)}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sign__row mb-3">
                  <div className="sign__col">
                    <p className="sign__label">Giới tính </p>
                    <OutsideHandler callback={() => setShowGender(false)}>
                      <div
                        className={`sign-custom__select ${
                          showGender ? "show" : ""
                        }`}
                        onClick={() => setShowGender((prevState) => !prevState)}
                      >
                        <li className="gender__text">
                          {gender ? gender : "Vui lòng chọn"}
                        </li>
                        <ul className={`${showGender ? "show" : ""}`}>
                          <li onClick={() => setGender("male")}>Male</li>
                          <li onClick={() => setGender("female")}>Female</li>
                          <li onClick={() => setGender("other")}>Other</li>
                        </ul>
                        <button className="sign__select-icon">
                          <i
                            className={`fas fa-chevron-${
                              showGender ? "up" : "down"
                            }`}
                          ></i>
                        </button>
                      </div>
                    </OutsideHandler>
                  </div>
                </div>
                <button
                  className={`sign__btn ${
                    signUp.isLoading ? "divDisable" : ""
                  }`}
                  type="submit"
                >
                  {signUp.isLoading ? "Đang đăng ký" : "Đăng ký"}
                </button>

                <span className="sign__text">
                  Đã có tài khoản? <Link to="/signin">Đăng nhập!</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
