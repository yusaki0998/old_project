/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router";
import FilmListSkeleton from "../../skeleton/FilmListSkeleton";
import DeleteFilm from "./DeleteFilm";

const FilmList = ({ list, isLoading, from }) => {
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
              <th>Tên phim</th>
              <th>Đạo diễn</th>
              <th>Thể loại</th>
              <th></th>
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
