/** @format */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateUserPasswordRequest } from "../../store/api/user";
import { useDispatch } from "react-redux";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";
import { v4 as uuid_v4 } from "uuid";
import { Helmet } from "react-helmet";

const EditPassword = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onValid = async (data) => {
    setLoading(true);
    try {
      const { data: resData } = await updateUserPasswordRequest(data);
      reset();
      const newNoti = {
        id: uuid_v4(),
        type: "success",
        message: resData.message || "Cập nhật mật khẩu thành công!",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
    } catch (error) {
      const newNoti = {
        id: uuid_v4(),
        type: "error",
        message:
          error?.response?.data?.message ||
          "Cập nhật mật khẩu thất bại. Vui lòng kiểm tra & thử lại",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit__customer-profile__wrapper my-5">
      <Helmet>
        <title> Đổi mật khẩu </title>
      </Helmet>
      <div className="d-flex">
        <div className="edit__form">
          <form
            className="edit__profile--form mx-auto"
            onSubmit={handleSubmit(onValid)}
          >
            <div className="sign__row mb-3">
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
                      message: "Đây là mục bắt buộc",
                    },
                  })}
                  autoComplete="false"
                />
                {errors.oldpassword && (
                  <p className="input-required">{errors.oldpassword.message}</p>
                )}
              </div>
            </div>
            <div className="sign__row mb-3">
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
                      message: "Đây là mục bắt buộc",
                    },
                  })}
                  autoComplete="false"
                />
                {errors.newpassword && (
                  <p className="input-required">{errors.newpassword.message}</p>
                )}
              </div>
            </div>
            <div className="sign__row mb-3">
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
                      message: "Đây là mục bắt buộc",
                    },
                    validate: (value) =>
                      watch("newpassword") === value ||
                      "Password confirm must matched",
                  })}
                  autoComplete="false"
                />
                {errors.retype && (
                  <p className="input-required">{errors.retype.message}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <button
                className={`btn__outline-orange btn__block ${
                  loading ? "divDisable" : ""
                }`}
                type="submit"
              >
                {loading ? "Đang lưu" : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
