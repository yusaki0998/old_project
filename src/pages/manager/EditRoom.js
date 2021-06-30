/** @format */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { updateRoomInfo } from "../../store/actions/managerActions";
import { useHistory, useLocation } from "react-router-dom";
import { getRoomDetailRequest } from "../../store/api/manager";
import { checkCondition } from "../../utils/helper";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const EditRoom = () => {
  const { updateRoom: updateRoomData } = useSelector((state) => state.manager);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(search);
  const roomIdField = query.get("roomId");
  const [isLoading, setIsLoading] = useState(false);
  const [roomDetailData, setRoomDetailData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!roomIdField) {
      history.goBack();
    } else {
      setIsLoading(true);
      getRoomDetailRequest(roomIdField)
        .then(({ data }) => {
          setRoomDetailData(data?.data);
          setIsLoading(false);
        })
        .catch((_) => {
          setIsLoading(false);
          history.goBack();
        });
    }
  }, [history, roomIdField]);

  const onValid = (data) => {
    dispatch(updateRoomInfo(roomIdField, data));
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
          Chỉnh sửa thông tin phòng chiếu
        </h3>
        {isLoading && <LoadingSpinner />}
        {!isLoading && roomDetailData.roomName && (
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
                    defaultValue={checkCondition(
                      roomDetailData?.roomName,
                      roomDetailData?.roomName,
                      ""
                    )}
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
                updateRoomData.isLoading ? "divDisable" : ""
              }`}
              type="submit"
            >
              {updateRoomData.isLoading ? "Đang cập nhật" : "Xác nhận"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default EditRoom;
