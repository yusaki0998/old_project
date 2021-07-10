/** @format */

import React, { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";
import { createSlotRequest } from "../../store/api/manager";
import { useDispatch } from "react-redux";
import { createSlotSuccess } from "../../store/actions/managerActions";
import {
  addNotification,
  removeNotification,
} from "../../store/actions/uiActions";
import { v4 as uuid_v4 } from "uuid";
import { useForm } from "react-hook-form";
import { checkCondition } from "../../utils/helper";
import OutsideHandler from "../shared/ClickWrapper";
import { convertSeatTypeToVietnamese } from "../../utils/convertGender";

const SeatForm = ({ open, close, seatData, roomName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [showSeatType, setShowSeatType] = useState(false);
  const [seatType, setSeatType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setSeatType(seatData?.seatType);
  }, [seatData]);

  const onValid = async (data) => {
    setIsLoading(true);
    const isUpdate = !!seatData?._id;
    try {
      const { data: dataRes } = await createSlotRequest(
        {
          ...data,
          startTime: data.startTime.replace(":", ""),
          endTime: data.endTime.replace(":", ""),
        },
        isUpdate,
        seatData?._id
      );
      setIsLoading(false);
      reset();
      close();
      const newNoti = {
        id: uuid_v4(),
        type: "success",
        message: isUpdate
          ? "Cập nhật slot thành công!"
          : "Tạo mới slot thành công!",
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 5000);
      dispatch(
        createSlotSuccess({
          data: dataRes.data,
          isUpdate,
          slotId: seatData?._id,
        })
      );
    } catch (error) {
      setIsLoading(false);
      const newNoti = {
        id: uuid_v4(),
        type: "error",
        message:
          error?.response?.data?.message ||
          (isUpdate
            ? "Cập nhật slot thất bại. Vui lòng thử lại!"
            : "Tạo mới slot thất bại. Vui lòng thử lại!"),
      };
      dispatch(addNotification(newNoti));
      setTimeout(() => {
        dispatch(removeNotification(newNoti.id));
      }, 5000);
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
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Số ghế</p>
            </div>
            <div className="col-md-8">
              <div className="sign__group">
                <input
                  type="text"
                  className={`sign__input sign__input-modal ${
                    errors.seatNo ? "input-error" : ""
                  }`}
                  defaultValue={checkCondition(
                    seatData?.seatNo,
                    seatData?.seatNo,
                    ""
                  )}
                  {...register("seatNo", {
                    required: {
                      value: true,
                      message: "Đây là mục bắt buộc",
                    },
                  })}
                />
                {errors.seatNo && (
                  <p className="input-required">{errors.seatNo.message}</p>
                )}
              </div>
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
                    <li onClick={() => setSeatType("vip")}>VIP</li>
                    <li onClick={() => setSeatType("normal")}>Thường</li>
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
                  defaultValue={checkCondition(
                    seatData?.price,
                    seatData?.price,
                    0
                  )}
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Đây là mục bắt buộc",
                    },
                  })}
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
