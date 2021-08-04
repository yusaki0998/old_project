/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListRoom } from "../../store/actions/managerActions";
import Paginator from "../../components/shared/Paginator";
import { Helmet } from "react-helmet";

export const MAX_ITEMS_PER_PAGE = 10;

const FilmRoom = () => {
  const dispatch = useDispatch();
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
        <title> Doanh thu </title>
      </Helmet>
      <div className="row">
        <div className="col-12">
          <h3 className="text-white mt-3">Doanh thu</h3>
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
