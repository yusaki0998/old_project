/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCurrentFilm } from "../../store/actions/managerActions";
import { searchFilmRequest } from "../../store/api/manager";
import FilmList from "../../components/manager/FilmList";
import Paginator from "../../components/shared/Paginator";
import { MAX_ITEMS_PER_PAGE } from "./FilmRoom";
import { Helmet } from "react-helmet";

const CurrentFilm = () => {
  const dispatch = useDispatch();
  const { currentFilm } = useSelector((state) => state.manager);
  const [searchInput, setSearchInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    dispatch(getListCurrentFilm());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(currentFilm.list);
  }, [currentFilm.list]);

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
      setFilteredList(currentFilm.list);
    }
  };

  return (
    <div className="tab-pane">
      <Helmet>
        <title> Phim đang chiếu </title>
      </Helmet>
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
                setFilteredList(currentFilm.list);
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
      </div>
      <FilmList
        isLoading={currentFilm.isLoading}
        list={filteredList.slice(
          curPage * MAX_ITEMS_PER_PAGE,
          (curPage + 1) * MAX_ITEMS_PER_PAGE
        )}
        from="current"
        title="Phim đang chiếu"
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

export default CurrentFilm;
