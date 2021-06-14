/** @format */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import logo from "../../template/styles/main/img/logo.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  convertGenderToVietnamese,
  convertRoleToVietnamese,
} from "../../utils/convertGender";
import { useDispatch, useSelector } from "react-redux";
import {
  createAccount,
  resetCreateAccountState,
} from "../../store/actions/adminActions";

const CreateAccount = () => {
  const [dob, setDob] = useState(new Date());
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
      setDob(new Date());
      const timer = setTimeout(() => {
        dispatch(resetCreateAccountState());
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [createAccountData?.success, reset, dispatch]);

  const onValid = (data) => {
    dispatch(
      createAccount({ ...data, role, gender, dob, retype: data.password })
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
                  <div className="col-md-4">
                    <p>Họ và tên</p>
                  </div>
                  <div className="col-md-8">
                    <div className="sign__group">
                      <input
                        type="text"
                        className={`sign__input ${
                          errors.fullname ? "input-error" : ""
                        }`}
                        {...register("fullname", {
                          required: {
                            value: true,
                            message: "This is required field",
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
                  <div className="col-md-4">
                    <p>Email</p>
                  </div>
                  <div className="col-md-8">
                    <div className="sign__group">
                      <input
                        type="text"
                        className={`sign__input ${
                          errors.email ? "input-error" : ""
                        }`}
                        {...register("email", {
                          required: {
                            value: true,
                            message: "This is required field",
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
                  <div className="col-md-4">
                    <p>Mật khẩu</p>
                  </div>
                  <div className="col-md-8">
                    <div className="sign__group">
                      <input
                        type="password"
                        className={`sign__input ${
                          errors.password ? "input-error" : ""
                        }`}
                        {...register("password", {
                          required: {
                            value: true,
                            message: "This is required field",
                          },
                        })}
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
                  <div className="col-md-4">
                    <p>Ngày sinh</p>
                  </div>
                  <div className="col-md-8">
                    <div className="sign__group">
                      <DatePicker
                        selected={dob}
                        onChange={(date) => setDob(date)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <p>Số điện thoại</p>
                  </div>
                  <div className="col-md-8">
                    <div className="sign__group">
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
                        })}
                      />
                      {errors.phone && (
                        <p className="input-required">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row align-items-center mb-4">
                  <div className="col-md-4">
                    <p>Giới tính</p>
                  </div>
                  <div className="col-md-8">
                    <div
                      className={`sign-custom__select ${
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
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <p>Chức vụ</p>
                  </div>
                  <div className="col-md-8">
                    <div
                      className={`sign-custom__select ${
                        showRole ? "show" : ""
                      }`}
                      onClick={() => setShowRole((prevState) => !prevState)}
                    >
                      <li className="gender__text">
                        {role ? convertRoleToVietnamese(role) : "Vui lòng chọn"}
                      </li>
                      <ul className={`${showRole ? "show" : ""}`}>
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
