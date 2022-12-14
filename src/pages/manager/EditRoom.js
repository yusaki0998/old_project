/** @format */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { updateRoomInfo } from "../../store/actions/managerActions";
import { useHistory, useLocation } from "react-router-dom";
import {
  getListSeatMapRequest,
  getRoomDetailRequest,
} from "../../store/api/manager";
import { checkCondition } from "../../utils/helper";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Helmet } from "react-helmet";
import { PROD_REST_API_URL } from "../../utils/constants";

const EditRoom = () => {
  const { updateRoom: updateRoomData } = useSelector((state) => state.manager);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(search);
  const roomIdField = query.get("roomId");
  const [isLoading, setIsLoading] = useState(false);
  const [roomDetailData, setRoomDetailData] = useState({});
  const [isLoadingMap, setIsLoadingMap] = useState(false);
  const [seatMapList, setSeatMapList] = useState([]);
  const [selectedSeatMap, setSelectedSeatMap] = useState("");

  const {
    handleSubmit,
    register,
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
          setSelectedSeatMap(data?.data?.seatMap?._id);
          setIsLoading(false);
        })
        .catch((_) => {
          setIsLoading(false);
          history.goBack();
        });
    }
  }, [history, roomIdField]);

  useEffect(() => {
    setIsLoadingMap(true);
    getListSeatMapRequest()
      .then(({ data }) => {
        setSeatMapList(data?.data || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingMap(false));
  }, []);

  const onValid = (data) => {
    dispatch(
      updateRoomInfo(roomIdField, { ...data, seatMap: selectedSeatMap })
    );
  };

  return (
    <main className="pb-4">
      <Helmet>
        <title> Ch???nh s???a ph??ng chi???u </title>
      </Helmet>
      <div className="admin__create-room__wrapper text-white mt-2r">
        <button
          className={`btn__outline-orange mb-4`}
          onClick={() => history.push("/manager/room")}
        >
          <i className="fas fa-chevron-left mr-2"></i> Quay l???i danh s??ch
        </button>
        <h3 className="border-bottom d-inline-block pb-1 border-white mb-4">
          Ch???nh s???a th??ng tin ph??ng chi???u
        </h3>
        {isLoading && <LoadingSpinner />}
        {!isLoading && roomDetailData.roomName && (
          <form onSubmit={handleSubmit(onValid)}>
            <div className="row align-items-center">
              <div className="col-md-2">
                <p>T??n ph??ng</p>
              </div>
              <div className="col-md-4">
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
                        message: "????y l?? m???c b???t bu???c",
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
              {isLoadingMap && <LoadingSpinner />}
              {!isLoadingMap &&
                seatMapList?.map((item) => (
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
                        <strong>{item.name}</strong>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <button
              className={`btn__outline-orange mx-auto my-4 ${
                updateRoomData.isLoading ? "divDisable" : ""
              }`}
              type="submit"
            >
              {updateRoomData.isLoading ? "??ang c???p nh???t" : "X??c nh???n"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default EditRoom;
