/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router";
import FilmListSkeleton from "../../skeleton/FilmListSkeleton";
import DeleteFilm from "./DeleteFilm";

const increaseDate = (dateStr) => {
  const dateObj = new Date();
  const month = new Date(dateStr).getMonth();
  dateObj.setDate(new Date(dateStr).getDate() + 6);
  dateObj.setMonth(month);
  if (
    (month + 1 === 4 ||
      month + 1 === 6 ||
      month + 1 === 9 ||
      month + 1 === 11) &&
    new Date(dateStr).getDate() + 6 > 30
  ) {
    dateObj.setMonth(month + 1);
  }
  if (
    (month + 1 === 1 ||
      month + 1 === 3 ||
      month + 1 === 5 ||
      month + 1 === 7 ||
      month + 1 === 8 ||
      month + 1 === 10 ||
      month + 1 === 12) &&
    new Date(dateStr).getDate() + 6 > 31
  ) {
    dateObj.setMonth(month + 1);
  }
  if (month + 1 === 2 && new Date(dateStr).getDate() + 6 > 28) {
    dateObj.setMonth(month + 1);
  }
  return `${dateObj.getFullYear()}-${
    dateObj.getMonth() + 1 > 9
      ? dateObj.getMonth() + 1
      : `0${dateObj.getMonth() + 1}`
  }-${dateObj.getDate() > 9 ? dateObj.getDate() : `0${dateObj.getDate()}`}`;
};

const FilmList = ({ list, isLoading, from, title }) => {
  const history = useHistory();
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState({});

  const onOpen = (film) => {
    setSelectedFilm(film);
    setOpenDelete(true);
  };

  const onClose = () => {
    setOpenDelete(false);
    setTimeout(() => {
      setSelectedFilm({});
    }, 1000);
  };

  return (
    <div className="admin__manager-list__wrapper">
      <div className="main__table-wrap">
        <table className="main__table">
          <thead>
            <tr>
              <th>ID</th>
              <th> {title} </th>
              <th>Đạo diễn</th>
              <th>Thể loại</th>
              <th>Ngày khởi chiếu</th>
              <th>Sửa / Xóa</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <FilmListSkeleton />}
            {!isLoading &&
              list.map((film, index) => (
                <tr key={film._id}>
                  <td>
                    <div className="main__table-text">{index + 1}</div>
                  </td>
                  <td>
                    <div className="main__table-text">{film.movieName}</div>
                  </td>
                  <td>
                    <div className="main__table-text">{film.director}</div>
                  </td>
                  <td>
                    <div className="main__table-text">{film.genre}</div>
                  </td>
                  <td>
                    <div className="main__table-text">
                      {film.showtimes.substr(0, 10)}
                    </div>
                  </td>
                  {/* <td>
                    <div className="main__table-text">
                      {increaseDate(film.showtimes)}
                    </div>
                  </td> */}
                  <td>
                    <div className="main__table-btns">
                      <button
                        className="main__table-btn main__table-btn--edit"
                        onClick={() =>
                          history.push(
                            `/manager/edit-film?filmId=${film._id}&from=${from}`
                          )
                        }
                      >
                        <i className="icon ion-ios-create"></i>
                      </button>
                      <button
                        className="main__table-btn main__table-btn--delete"
                        onClick={() => onOpen(film)}
                      >
                        <i className="icon ion-ios-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <DeleteFilm
        open={openDelete}
        filmData={selectedFilm}
        from={from}
        close={onClose}
      />
    </div>
  );
};

export default FilmList;
