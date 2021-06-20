/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListSlot } from "../../store/actions/managerActions";
import { searchFilmRequest } from "../../store/api/manager";
import SlotList from "../../components/manager/SlotList";
import Paginator from "../../components/shared/Paginator";
import { useHistory } from "react-router-dom";
import { MAX_ITEMS_PER_PAGE } from "./FilmRoom";

const ViewSlot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { slot } = useSelector((state) => state.manager);
  const [searchInput, setSearchInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    dispatch(getListSlot());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(slot.list);
  }, [slot.list]);

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
      setFilteredList(slot.list);
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
                setFilteredList(slot.list);
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
          onClick={() => history.push("/manager/new-slot")}
        >
          Tạo mới Slot
        </button>
      </div>
      <SlotList
        isLoading={slot.isLoading}
        list={filteredList.slice(
          curPage * MAX_ITEMS_PER_PAGE,
          (curPage + 1) * MAX_ITEMS_PER_PAGE
        )}
      />
      <Paginator
        curPage={curPage}
        maxPage={Math.ceil(filteredList.length / MAX_ITEMS_PER_PAGE)}
        setCurPage={setCurPage}
        totalItems={filteredList.length}
      />
    </div>
  );
};

export default ViewSlot;
