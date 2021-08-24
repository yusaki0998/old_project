/** @format */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListComingFilm } from "../../store/actions/managerActions";
import FilmList from "../../components/manager/FilmList";
import Paginator from "../../components/shared/Paginator";
import { searchFilmRequest } from "../../store/api/manager";
import { MAX_ITEMS_PER_PAGE } from "./FilmRoom";
import { Helmet } from "react-helmet";

const IncomingFilm = () => {
  const dispatch = useDispatch();
  const { comingFilm } = useSelector((state) => state.manager);
  const [searchInput, setSearchInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    dispatch(getListComingFilm());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(comingFilm.list);
  }, [comingFilm.list]);

  const onSearchFilm = (e) => {
    e.preventDefault();
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
      setFilteredList(comingFilm.list);
    }
  };
  return (
    <div className="tab-pane">
      <Helmet>
        <title> Phim sắp chiếu </title>
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
                setFilteredList(comingFilm.list);
              }
            }}
          />
          <button
            className="table__search-button"
            type="submit"
            onClick={onSearchFilm}
          >
            <i className="icon ion-ios-search"></i>
          </button>
        </form>
      </div>
      <FilmList
        isLoading={comingFilm.isLoading}
        list={filteredList.slice(
          curPage * MAX_ITEMS_PER_PAGE,
          (curPage + 1) * MAX_ITEMS_PER_PAGE
        )}
        from="coming"
        title="Phim sắp chiếu"
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

export default IncomingFilm;
