/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListRoom } from "../../store/actions/managerActions";
import RoomList from "../../components/manager/RoomList";
import Paginator from "../../components/shared/Paginator";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

export const MAX_ITEMS_PER_PAGE = 10;

const FilmRoom = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { room: roomData } = useSelector((state) => state.manager);
  const [filteredList, setFilteredList] = useState([]);
  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    dispatch(getListRoom());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(roomData.list);
  }, [roomData.list]);

  return (
    <div className="tab-pane">
      <Helmet>
        <title> Phòng chiếu </title>
      </Helmet>
      <div className="row">
        <div className="col-12 col-sm-10 col-md-9 col-lg-8">
          <div className="d-flex align-items-center my-4">
            <button
              className="btn__outline-orange ml-0"
              onClick={() => history.push("/manager/new-room")}
            >
              Tạo phòng
            </button>
          </div>
          <RoomList
            isLoading={roomData.isLoading}
            list={filteredList.slice(
              curPage * MAX_ITEMS_PER_PAGE,
              (curPage + 1) * MAX_ITEMS_PER_PAGE
            )}
          />
          <div className="room__paginator">
            <Paginator
              curPage={curPage}
              maxPage={Math.ceil(filteredList.length / MAX_ITEMS_PER_PAGE)}
              setCurPage={setCurPage}
              totalItems={filteredList.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmRoom;
