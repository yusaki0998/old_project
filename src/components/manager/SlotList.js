/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router";
import SlotListSkeleton from "../../skeleton/SlotListSkeleton";
import DeleteFilm from "./DeleteFilm";

const SlotList = ({ list, isLoading }) => {
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
              <th>Slot</th>
              <th>Thời gian</th>
              <th>Sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <SlotListSkeleton />}
            {!isLoading &&
              list.map((slot, index) => (
                <tr key={slot._id}>
                  <td>
                    <div className="main__table-text">{index + 1}</div>
                  </td>
                  <td>
                    <div className="main__table-text">{slot.slotName}</div>
                  </td>
                  <td>
                    <div className="main__table-text">
                      {slot.startTime}: {slot.endTime}
                    </div>
                  </td>
                  <td>
                    <div className="main__table-btns">
                      <button
                        className="main__table-btn main__table-btn--edit"
                        onClick={() =>
                          history.push(`/manager/edit-slot?slotId=${slot._id}`)
                        }
                      >
                        <i className="icon ion-ios-create"></i>
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="main__table-btns">
                      <button
                        className="main__table-btn main__table-btn--delete"
                        onClick={() => onOpen(slot)}
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
      <DeleteFilm open={openDelete} filmData={selectedFilm} close={onClose} />
    </div>
  );
};

export default SlotList;
