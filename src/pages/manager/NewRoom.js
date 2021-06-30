/** @format */

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createRoom,
  resetCreateRoomState,
} from "../../store/actions/managerActions";

const NewRoom = () => {
  const { createRoom: createRoomData } = useSelector((state) => state.manager);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (createRoomData?.success) {
      reset();
      const timer = setTimeout(() => {
        dispatch(resetCreateRoomState());
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [createRoomData?.success, reset, dispatch]);

  const onValid = (data) => {
    dispatch(createRoom(data));
  };

  return (
    <main className="pb-4">
      <div className="admin__create-account__wrapper text-white">
        <button
          className={`btn__outline-orange mb-4`}
          onClick={() => history.push("/manager/room")}
        >
          <i className="fas fa-chevron-left mr-2"></i> Quay lại danh sách
        </button>
        <h3 className="border-bottom d-inline-block pb-1 border-white mb-4">
          Tạo mới phòng chiếu
        </h3>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Tên phòng</p>
            </div>
            <div className="col-md-8">
              <div className="sign__group">
                <input
                  type="text"
                  className={`sign__input ${
                    errors.roomName ? "input-error" : ""
                  }`}
                  {...register("roomName", {
                    required: {
                      value: true,
                      message: "Đây là mục bắt buộc",
                    },
                  })}
                />
                {errors.roomName && (
                  <p className="input-required">{errors.roomName.message}</p>
                )}
              </div>
            </div>
          </div>
          <button
            className={`btn__outline-orange mx-auto my-4 ${
              createRoomData.isLoading ? "divDisable" : ""
            }`}
            type="submit"
          >
            {createRoomData.isLoading ? "Đang tạo phòng" : "Tạo phòng"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default NewRoom;
