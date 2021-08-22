/** @format */

import React, { useState } from "react";
import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";
import { updateSeatInfoRequest } from "../../store/api/manager";
import { useDispatch } from "react-redux";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";
import { v4 as uuid_v4 } from "uuid";
import { useForm } from "react-hook-form";
import OutsideHandler from "../shared/ClickWrapper";
import { convertSeatTypeToVietnamese } from "../../utils/convertGender";

const SeatForm = ({
  open,
  close,
  roomName,
  fetchRoomDetail,
  mapId,
  vipSeatPrice,
  normalSeatPrice,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [showSeatType, setShowSeatType] = useState(false);
  const [seatType, setSeatType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm();

  const onValid = async (data) => {
    if (!seatType) {
      setError("seatType", {
        type: "manual",
        message: "Đây là mục bắt buộc",
      });
      return;
    }
    setIsLoading(true);
    try {
      await updateSeatInfoRequest(mapId, {
        ...data,
        type: seatType,
      });
      fetchRoomDetail();
      setIsLoading(false);
      reset();
      close();
      const newNoti = {
        id: uuid_v4(),
        type: "success",
        message: "Cập nhật ghế thành công!",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      const newNoti = {
        id: uuid_v4(),
        type: "error",
        message:
          error?.response?.data?.message ||
          "Cập nhật ghế thất bại. Vui lòng thử lại!",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 2000);
    }
  };

  return (
    <>
      <Modal
        open={open}
        close={() => {
          reset();
          close();
        }}
        title={"Thay đổi thông tin ghế"}
        body={null}
        onConfirm={handleSubmit(onValid)}
        isLoading={isLoading}
      >
        <div className="slot__detail-modal">
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Số phòng</p>
            </div>
            <div className="col-md-8">
              <p>{roomName}</p>
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <p>Loại ghế</p>
            </div>
            <div className="col-md-8">
              <OutsideHandler callback={() => setShowSeatType(false)}>
                <div
                  className={`sign-custom__select ${
                    showSeatType ? "show" : ""
                  }`}
                  onClick={() => setShowSeatType((prevState) => !prevState)}
                >
                  <li className="gender__text">
                    {convertSeatTypeToVietnamese(seatType)}
                  </li>
                  <ul
                    className={`${showSeatType ? "show" : ""}`}
                    style={{
                      height: 95,
                    }}
                  >
                    <li
                      onClick={() => {
                        setSeatType("vip");
                        setValue("price", vipSeatPrice);
                        clearErrors("seatType");
                      }}
                    >
                      VIP
                    </li>
                    <li
                      onClick={() => {
                        setSeatType("normal");
                        setValue("price", normalSeatPrice);
                        clearErrors("seatType");
                      }}
                    >
                      Thường
                    </li>
                  </ul>
                  <button className="sign__select-icon">
                    <i
                      className={`fas fa-chevron-${
                        showSeatType ? "up" : "down"
                      }`}
                    ></i>
                  </button>
                </div>
              </OutsideHandler>
              {errors.seatType && (
                <p className="input-required">{errors.seatType.message}</p>
              )}
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Giá tiền</p>
            </div>
            <div className="col-md-8">
              <div className="sign__group">
                <input
                  type="number"
                  className={`sign__input sign__input-modal ${
                    errors.price ? "input-error" : ""
                  }`}
                  step={1000}
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Đây là mục bắt buộc",
                    },
                  })}
                  min={0}
                />
                {errors.price && (
                  <p className="input-required">{errors.price.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Backdrop
        open={open}
        onClicked={() => {
          if (!isLoading) {
            close();
          }
        }}
      />
    </>
  );
};

export default SeatForm;
