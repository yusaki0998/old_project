/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListRoom } from "../../store/actions/managerActions";
import { searchFilmRequest } from "../../store/api/manager";
import RoomList from "../../components/manager/RoomList";
import Paginator from "../../components/shared/Paginator";
import { useHistory } from "react-router-dom";

export const MAX_ITEMS_PER_PAGE = 10;

const FilmRoom = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { room: roomData } = useSelector((state) => state.manager);
  const [searchInput, setSearchInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    dispatch(getListRoom());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(roomData.list);
  }, [roomData.list]);

  const onSearchFilm = () => {
    if (isTouched && searchInput.trim()) {
      searchFilmRequest(searchInput.trim().toLowerCase())
        .then(({ data }) => {
          setFilteredList(data?.data || []);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (!searchInput.trim()) {
      setFilteredList(roomData.list);
    }
  };

  return (
    <div className="tab-pane">
      <div className="d-flex justify-content-between align-items-center my-4">
        <form className="table__search">
          <input
            className="header__search-input"
            type="text"
            placeholder="Tìm kiếm..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setIsTouched(true);
              if (!e.target.value.trim()) {
                setFilteredList(roomData.list);
              }
            }}
          />
          <button
            className="table__search-button"
            type="button"
            onClick={onSearchFilm}
          >
            <i className="icon ion-ios-search"></i>
          </button>
        </form>
        <button
          className="btn__outline-orange"
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
  );
};

export default FilmRoom;
