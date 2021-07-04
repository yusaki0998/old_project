/** @format */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import userImg from "../../template/styles/main/img/user.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertGenderToVietnamese } from "../../utils/convertGender";
import { editUserProfile } from "../../store/actions/userActions";
import OutsideHandler from "../../components/shared/ClickWrapper";
import { PROD_REST_API_IMG_URL } from "../../utils/constants";

const EditProfile = () => {
  const { loginData } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [dob, setDob] = useState(new Date(loginData?.data?.dob));
  const [gender, setGender] = useState(loginData?.data?.gender);
  const [showGender, setShowGender] = useState(false);
  const dispatch = useDispatch();

  const onValid = (data) => {
    dispatch(editUserProfile({ ...data, gender }));
  };

  return (
    <div className="edit__customer-profile__wrapper my-5">
      <div className="d-flex">
        <div className="image__placeholder mr-4">
          <img
            className="d-block my-3 user__img-wrapper"
            src={
              loginData?.data?.avatar
                ? `${PROD_REST_API_IMG_URL}${loginData?.data?.avatar?.replace(
                    "../uploads",
                    ""
                  )}`
                : userImg
            }
            alt={loginData?.data?.fullname || ""}
          />
          <button className="btn__outline-orange">Thay đổi</button>
        </div>
        <div className="edit__form">
          <p className="mt-3">
            <strong>Đổi thông tin tài khoản</strong>
          </p>
          <form
            className="edit__profile--form"
            onSubmit={handleSubmit(onValid)}
          >
            <div className="sign__row mb-3">
              <div className="sign__col">
                <p className="sign__label">Tên</p>
                <input
                  type="text"
                  className={`sign__input ${
                    errors.fullname ? "input-error" : ""
                  }`}
                  defaultValue={loginData?.data?.fullname}
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
            </div>
            <div className="sign__row mb-3">
              <div className="sign__col">
                <p className="sign__label">Email</p>
                <input
                  type="email"
                  className={`sign__input divDisable ${
                    errors.email ? "input-error" : ""
                  }`}
                  defaultValue={loginData?.data?.email}
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
            <div className="sign__row mb-3">
              <div className="sign__col">
                <p className="sign__label">Ngày sinh</p>
                <DatePicker
                  selected={dob}
                  onChange={(date) => setDob(date)}
                  className="divDisable"
                />
              </div>
            </div>
            <div className="sign__row mb-3">
              <div className="sign__col">
                <p className="sign__label">Giới tính</p>
                <OutsideHandler callback={() => setShowGender(false)}>
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
                </OutsideHandler>
              </div>
            </div>
            <div className="mb-3">
              <button
                className={`btn__outline-orange btn__block ${
                  isLoading ? "divDisable" : ""
                }`}
                type="submit"
              >
                {isLoading ? "Đang lưu" : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
