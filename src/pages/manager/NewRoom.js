/** @format */

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createRoom,
  resetCreateRoomState,
} from "../../store/actions/managerActions";
import { getListSeatMapRequest } from "../../store/api/manager";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Helmet } from "react-helmet";
import { PROD_REST_API_URL } from "../../utils/constants";

const NewRoom = () => {
  const { createRoom: createRoomData } = useSelector((state) => state.manager);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [seatMapList, setSeatMapList] = useState([]);
  const [selectedSeatMap, setSelectedSeatMap] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (createRoomData?.success) {
      reset();
      setSelectedSeatMap("");
      const timer = setTimeout(() => {
        dispatch(resetCreateRoomState());
        history.push("/manager/room");
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [createRoomData?.success, reset, dispatch, history]);

  useEffect(() => {
    setIsLoading(true);
    getListSeatMapRequest()
      .then(({ data }) => {
        setSeatMapList(data?.data || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const onValid = (data) => {
    dispatch(createRoom({ ...data, seatMap: selectedSeatMap }));
  };

  return (
    <main className="pb-4">
      <Helmet>
        <title> Tạo mới phòng chiếu </title>
      </Helmet>
      <div className="admin__create-room__wrapper text-white mt-2r">
        <button
          className={`btn__outline-orange mb-4 ml-0`}
          onClick={() => history.push("/manager/room")}
        >
          <i className="fas fa-chevron-left mr-2"></i> Quay lại danh sách
        </button>
        <h3 className="border-bottom d-inline-block pb-1 border-white mb-4">
          Tạo mới phòng chiếu
        </h3>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="row align-items-center">
            <div className="col-md-2">
              <p>Tên phòng</p>
            </div>
            <div className="col-md-4">
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
          <div className="row">
            {isLoading && <LoadingSpinner />}
            {!isLoading &&
              seatMapList?.map((item, index) => (
                <div className="col-6 col-sm-4 col-md-3" key={item._id}>
                  <div
                    className={`seat__map-item ${
                      selectedSeatMap === item._id ? "active" : ""
                    }`}
                  >
                    <img
                      src={`${PROD_REST_API_URL}${item?.image?.replace(
                        "..",
                        ""
                      )}`}
                      alt="seat map"
                      onClick={() => setSelectedSeatMap(item?._id)}
                    />
                    <p>
                      <strong>Sơ đồ {index + 1}</strong>
                    </p>
                  </div>
                </div>
              ))}
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
