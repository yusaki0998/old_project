import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import userImg from "../../template/styles/main/img/user.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertGenderToVietnamese } from "../../utils/convertGender";
import { editUserProfile } from "../../store/actions/userActions";

const EditProfile = () => {
  const { loginData } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
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
        <div className="image__placeholder mr-3">
          <img
            className="d-block my-3 mx-auto w-100"
            src={userImg}
            alt={loginData?.data?.fullname || ""}
          />
          <button className="btn__outline-orange">Thay đổi</button>
        </div>
        <div className="edit__form">
          <p>
            <strong>Thông tin tài khoản</strong>
          </p>
          <form onSubmit={handleSubmit(onValid)}>
            <div className="sign__row mb-3">
              <div className="sign__col mr-3">
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
                      message: "This is required field",
                    },
                  })}
                />
                {errors.fullname && (
                  <p className="input-required">{errors.fullname.message}</p>
                )}
              </div>
              <div className="sign__col">
                <p className="sign__label">Mật khẩu cũ</p>
                <input
                  type="password"
                  className={`sign__input ${
                    errors.oldpassword ? "input-error" : ""
                  }`}
                  {...register("oldpassword", {
                    required: {
                      value: true,
                      message: "This is required field",
                    },
                  })}
                />
                {errors.oldpassword && (
                  <p className="input-required">{errors.oldpassword.message}</p>
                )}
              </div>
            </div>
            <div className="sign__row mb-3">
              <div className="sign__col mr-3">
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
                      message: "This is required field",
                    },
                  })}
                />
                {errors.email && (
                  <p className="input-required">{errors.email.message}</p>
                )}
              </div>
              <div className="sign__col">
                <p className="sign__label">Mật khẩu mới</p>
                <input
                  type="password"
                  className={`sign__input ${
                    errors.newpassword ? "input-error" : ""
                  }`}
                  {...register("newpassword", {
                    required: {
                      value: true,
                      message: "This is required field",
                    },
                  })}
                />
                {errors.newpassword && (
                  <p className="input-required">{errors.newpassword.message}</p>
                )}
              </div>
            </div>
            <div className="sign__row mb-3">
              <div className="sign__col mr-3">
                <p className="sign__label">Ngày sinh</p>
                <DatePicker
                  selected={dob}
                  onChange={(date) => setDob(date)}
                  className="divDisable"
                />
              </div>
              <div className="sign__col">
                <p className="sign__label">Nhập lại mật khẩu mới</p>
                <input
                  type="password"
                  className={`sign__input ${
                    errors.retype ? "input-error" : ""
                  }`}
                  {...register("retype", {
                    required: {
                      value: true,
                      message: "This is required field",
                    },
                    validate: (value) =>
                      watch("newpassword") === value ||
                      "Password confirm must matched",
                  })}
                />
                {errors.retype && (
                  <p className="input-required">{errors.retype.message}</p>
                )}
              </div>
            </div>
            <div className="sign__row mb-3">
              <div className="sign__col mr-3">
                <p className="sign__label">Giới tính</p>
                <div
                  className={`sign-custom__select ${showGender ? "show" : ""}`}
                  onClick={() => setShowGender((prevState) => !prevState)}
                >
                  <li className="gender__text">
                    {gender
                      ? convertGenderToVietnamese(gender)
                      : "Please choose"}
                  </li>
                  <ul className={`${showGender ? "show" : ""}`}>
                    <li onClick={() => setGender("male")}>Nam</li>
                    <li onClick={() => setGender("female")}>Nữ</li>
                    <li onClick={() => setGender("other")}>Khác</li>
                  </ul>
                  <button className="sign__select-icon">
                    <i
                      className={`fas fa-chevron-${showGender ? "up" : "down"}`}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="sign__col">
                <p className="sign__label unvisible">Button label</p>
                <button
                  className="btn__outline-orange btn__block"
                  type="submit"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
