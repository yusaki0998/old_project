/** @format */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import MovieFiltered from "../../components/main/MovieFiltered";
import { globalGetListCurrentFilm } from "../../store/actions/globalActions";
import { searchFilmRequest } from "../../store/api/manager";

const BookingListFilm = () => {
  const dispatch = useDispatch();
  const { currentFilm } = useSelector((state) => state.global);
  const [searchInput, setSearchInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [isSearchingMovies, setIsSearchingMovies] = useState(false);

  useEffect(() => {
    setFilteredList(currentFilm.list);
  }, [currentFilm.list]);

  useEffect(() => {
    dispatch(globalGetListCurrentFilm());
  }, [dispatch]);

  const onSearchFilm = () => {
    if (isTouched && searchInput.trim()) {
      setIsSearchingMovies(true);
      searchFilmRequest(searchInput.trim().toLowerCase())
        .then(({ data }) => {
          setFilteredList(data?.data || []);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsSearchingMovies(false));
    }
    if (!searchInput.trim()) {
      setFilteredList(currentFilm.list);
    }
  };

  return (
    <div className="staff__booking-ticket text-white my-4">
      <Helmet>
        <title> Đặt vé </title>
      </Helmet>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Danh sách phim đang chiếu</h3>
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
      <div className="list">
        <MovieFiltered
          isLoading={currentFilm.isLoading || isSearchingMovies}
          list={filteredList}
          filmItemClassName="col-xl-3"
          hideFiltered
          isStaff
        />
      </div>
    </div>
  );
};

export default BookingListFilm;
