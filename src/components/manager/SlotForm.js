/** @format */

import React, { useEffect, useState } from "react";
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
import { checkCondition, convertStrToTime } from "../../utils/helper";

const SlotForm = ({ open, close, slotData }) => {
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (slotData._id) {
      setValue("slotName", slotData.slotName, { shouldDirty: true });
    }
  }, [setValue, slotData?._id, slotData.slotName]);

  const onValid = async (data) => {
    setIsLoading(true);
    const isUpdate = !!slotData._id;
    try {
      const { data: dataRes } = await createSlotRequest(
        {
          ...data,
          startTime: data.startTime.replace(":", ""),
          endTime: data.endTime.replace(":", ""),
        },
        isUpdate,
        slotData?._id
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
      }, 2000);
      dispatch(
        createSlotSuccess({
          data: dataRes.data,
          isUpdate,
          slotId: slotData?._id,
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
      }, 2000);
    }
  };

  return (
    <>
      <Modal
        open={open}
        close={() => {
          reset();
          setValue("slotName", "", { shouldDirty: true });
          close();
        }}
        title={
          slotData._id ? "Thay đổi thời gian chiếu" : "Tạo mới thời gian chiếu"
        }
        body={null}
        onConfirm={handleSubmit(onValid)}
        isLoading={isLoading}
      >
        <div className="slot__detail-modal">
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Tên slot</p>
            </div>
            <div className="col-md-8">
              <div className="sign__group">
                <input
                  type="text"
                  className={`sign__input sign__input-modal ${
                    errors.slotName ? "input-error" : ""
                  }`}
                  defaultValue={checkCondition(
                    slotData?.slotName,
                    slotData?.slotName,
                    ""
                  )}
                  {...register("slotName", {
                    required: {
                      value: slotData._id ? false : true,
                      message: "Đây là mục bắt buộc",
                    },
                  })}
                />
                {errors.slotName && (
                  <p className="input-required">{errors.slotName.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Bắt đầu</p>
            </div>
            <div className="col-md-8">
              <div className="sign__group">
                <input
                  type="time"
                  className={`sign__input sign__input-modal ${
                    errors.startTime ? "input-error" : ""
                  }`}
                  defaultValue={checkCondition(
                    slotData?.startTime,
                    convertStrToTime(slotData?.startTime),
                    ""
                  )}
                  {...register("startTime", {
                    required: {
                      value: slotData._id ? false : true,
                      message: "Đây là mục bắt buộc",
                    },
                  })}
                />
                {errors.startTime && (
                  <p className="input-required">{errors.startTime.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Kết thúc</p>
            </div>
            <div className="col-md-8">
              <div className="sign__group">
                <input
                  type="time"
                  className={`sign__input sign__input-modal ${
                    errors.endTime ? "input-error" : ""
                  }`}
                  defaultValue={checkCondition(
                    slotData?.endTime,
                    convertStrToTime(slotData?.endTime),
                    ""
                  )}
                  {...register("endTime", {
                    required: {
                      value: slotData._id ? false : true,
                      message: "Đây là mục bắt buộc",
                    },
                  })}
                />
                {errors.endTime && (
                  <p className="input-required">{errors.endTime.message}</p>
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

export default SlotForm;
