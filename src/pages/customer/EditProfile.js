/** @format */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { convertGenderToVietnamese } from "../../utils/convertGender";
import { editUserProfile } from "../../store/actions/userActions";
import OutsideHandler from "../../components/shared/ClickWrapper";
import { checkCondition, getBirhDate } from "../../utils/helper";
import { Helmet } from "react-helmet";

const EditProfile = () => {
  const { loginData } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [gender, setGender] = useState(loginData?.data?.gender);
  const [showGender, setShowGender] = useState(false);
  const dispatch = useDispatch();

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
    dispatch(editUserProfile({ ...data, gender, dob }));
  };

  return (
    <div className="edit__customer-profile__wrapper my-5">
      <Helmet>
        <title> Chỉnh sửa thông tin cá nhân </title>
      </Helmet>
      <div className="d-flex flex-col">
        <div className="edit__form">
          <form
            className="edit__profile--form mx-auto"
            onSubmit={handleSubmit(onValid)}
          >
            <p className="mt-3">
              <strong>Đổi thông tin tài khoản</strong>
            </p>
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
                        defaultValue={checkCondition(
                          loginData?.data?.dob,
                          getBirhDate(loginData?.data?.dob)[0],
                          ""
                        )}
                      >
                        {optionListMarkup(1910, 2025)}
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
                        defaultValue={checkCondition(
                          loginData?.data?.dob,
                          getBirhDate(loginData?.data?.dob)[1],
                          ""
                        )}
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
                        defaultValue={checkCondition(
                          loginData?.data?.dob,
                          getBirhDate(loginData?.data?.dob)[2],
                          ""
                        )}
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
                <p className="sign__label">Số điện thoại</p>
                <input
                  type="text"
                  className={`sign__input ${errors.phone ? "input-error" : ""}`}
                  placeholder="Số điện thoại"
                  defaultValue={loginData?.data?.phone}
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
