/** @format */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import logo from "../../template/styles/main/img/logo.svg";
import {
  convertGenderToVietnamese,
  convertRoleToVietnamese,
} from "../../utils/convertGender";
import { useDispatch, useSelector } from "react-redux";
import {
  createAccount,
  resetCreateAccountState,
} from "../../store/actions/adminActions";
import OutsideHandler from "../../components/shared/ClickWrapper";

const CreateAccount = () => {
  const [gender, setGender] = useState("");
  const [showGender, setShowGender] = useState(false);
  const [role, setRole] = useState("");
  const [showRole, setShowRole] = useState(false);
  const { createAccount: createAccountData } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (createAccountData?.success) {
      reset();
      setGender("");
      setRole("");
      const timer = setTimeout(() => {
        dispatch(resetCreateAccountState());
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [createAccountData?.success, reset, dispatch]);

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
      createAccount({
        ...data,
        role,
        gender,
        dob,
        retype: data.password,
      })
    );
  };

  return (
    <main className="main">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="admin__create-account__wrapper text-white">
              <img src={logo} alt="Hotflix" className="d-block mx-auto my-4" />
              <form onSubmit={handleSubmit(onValid)}>
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <p>Họ và tên</p>
                  </div>
                  <div className="col-md-10">
                    <div className="sign__group">
                      <input
                        type="text"
                        className={`sign__input ${
                          errors.fullname ? "input-error" : ""
                        }`}
                        {...register("fullname", {
                          required: {
                            value: true,
                            message: "Đây là mục bắt buộc",
                          },
                        })}
                      />
                      {errors.fullname && (
                        <p className="input-required">
                          {errors.fullname.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <p>Email</p>
                  </div>
                  <div className="col-md-10">
                    <div className="sign__group">
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
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <p>Mật khẩu</p>
                  </div>
                  <div className="col-md-10">
                    <div className="sign__group">
                      <input
                        type="password"
                        className={`sign__input ${
                          errors.password ? "input-error" : ""
                        }`}
                        {...register("password", {
                          required: {
                            value: true,
                            message: "Đây là mục bắt buộc",
                          },
                        })}
                        autoComplete="false"
                      />
                      {errors.password && (
                        <p className="input-required">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <p>Ngày sinh</p>
                  </div>
                  <div className="col-md-10">
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
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <p>Số điện thoại</p>
                  </div>
                  <div className="col-md-10">
                    <div className="sign__group">
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
                  </div>
                </div>
                <div className="row align-items-center mb-4">
                  <div className="col-md-2">
                    <p>Giới tính</p>
                  </div>
                  <div className="col-md-10">
                    <OutsideHandler callback={() => setShowGender(false)}>
                      <div
                        className={`mw-50 sign-custom__select ${
                          showGender ? "show" : ""
                        }`}
                        onClick={() => setShowGender((prevState) => !prevState)}
                      >
                        <li className="gender__text">
                          {gender
                            ? convertGenderToVietnamese(gender)
                            : "Vui lòng chọn"}
                        </li>
                        <ul className={`${showGender ? "show" : ""}`}>
                          <li onClick={() => setGender("male")}>Nam</li>
                          <li onClick={() => setGender("female")}>Nữ</li>
                          <li onClick={() => setGender("other")}>Khác</li>
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
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <p>Chức vụ</p>
                  </div>
                  <div className="col-md-10">
                    <OutsideHandler callback={() => setShowRole(false)}>
                      <div
                        className={`mw-50 sign-custom__select ${
                          showRole ? "show" : ""
                        }`}
                        onClick={() => setShowRole((prevState) => !prevState)}
                      >
                        <li className="gender__text">
                          {role
                            ? convertRoleToVietnamese(role)
                            : "Vui lòng chọn"}
                        </li>
                        <ul
                          className={`${showRole ? "show" : ""}`}
                          style={{
                            height: 95,
                          }}
                        >
                          <li onClick={() => setRole("manager")}>Quản lý</li>
                          <li onClick={() => setRole("staff")}>Nhân viên</li>
                        </ul>
                        <button className="sign__select-icon">
                          <i
                            className={`fas fa-chevron-${
                              showRole ? "up" : "down"
                            }`}
                          ></i>
                        </button>
                      </div>
                    </OutsideHandler>
                  </div>
                </div>
                <button
                  className={`btn__outline-orange mx-auto my-4 ${
                    createAccountData.isLoading ? "divDisable" : ""
                  }`}
                  type="submit"
                >
                  {createAccountData.isLoading
                    ? "Đang tạo tài khoản"
                    : "Tạo tài khoản"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateAccount;
