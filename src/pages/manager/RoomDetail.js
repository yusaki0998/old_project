/** @format */

import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getRoomDetailRequest } from "../../store/api/manager";
import { checkCondition } from "../../utils/helper";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import SeatMap from "../../components/manager/SeatMap";
import SeatForm from "../../components/manager/SeatForm";

const RoomDetail = () => {
  const { search } = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(search);
  const roomIdField = query.get("roomId");
  const [isLoading, setIsLoading] = useState(false);
  const [roomDetailData, setRoomDetailData] = useState({});
  const [openSeatForm, setOpenSeatForm] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState({});

  const onShowSeatForm = (seatData) => {
    setSelectedSeat(seatData);
    setOpenSeatForm(true);
  };

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

  return (
    <main className="pb-4">
      <div className="admin__create-room__wrapper text-white mt-2r">
        <button
          className={`btn__outline-orange mb-4`}
          onClick={() => history.push("/manager/room")}
        >
          <i className="fas fa-chevron-left mr-2"></i> Quay lại danh sách
        </button>
        <h3 className="border-bottom d-inline-block pb-1 border-white mb-4">
          Chỉnh sửa thông tin ghế
        </h3>
        {isLoading && <LoadingSpinner />}
        {!isLoading && roomDetailData.roomName && (
          <div>
            <div className="row align-items-center">
              <div className="col-md-2">
                <p>Tên phòng</p>
              </div>
              <div className="col-md-4">
                <div className="sign__group divDisable">
                  <input
                    type="text"
                    className="sign__input"
                    defaultValue={checkCondition(
                      roomDetailData?.roomName,
                      roomDetailData?.roomName,
                      ""
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <SeatMap
                seatList={roomDetailData?.seatMap?.seats || []}
                openForm={onShowSeatForm}
              />
            </div>
            <div className="seat__types seat__list">
              <div className="d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center mr-4">
                  <div className="seat__item vip">
                    <div className="seat__head"></div>
                    <div className="seat__body">
                      <span className="seat__text"></span>
                    </div>
                  </div>
                  <span>Ghế VIP</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="seat__item">
                    <div className="seat__head"></div>
                    <div className="seat__body">
                      <span className="seat__text"></span>
                    </div>
                  </div>
                  <span>Ghế Thường</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <SeatForm
        open={openSeatForm}
        close={() => {
          setSelectedSeat({});
          setOpenSeatForm(false);
        }}
        seatData={selectedSeat}
        roomName={roomDetailData?.roomName}
      />
    </main>
  );
};

export default RoomDetail;
