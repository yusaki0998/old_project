/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router";
import RoomListSkeleton from "../../skeleton/RoomListSkeleton";
import DeleteRoom from "./DeleteRoom";

const RoomList = ({ list, isLoading }) => {
  const history = useHistory();
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({});

  const onOpen = (room) => {
    setSelectedRoom(room);
    setOpenDelete(true);
  };

  const onClose = () => {
    setOpenDelete(false);
    setTimeout(() => {
      setSelectedRoom({});
    }, 1000);
  };

  return (
    <div className="admin__manager-list__wrapper">
      <div className="main__table-wrap">
        <table className="main__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên phòng</th>
              <th>Sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <RoomListSkeleton />}
            {!isLoading &&
              list.map((room, index) => (
                <tr key={room._id}>
                  <td>
                    <div className="main__table-text">{index + 1}</div>
                  </td>
                  <td>
                    <div className="main__table-text">{room.roomName}</div>
                  </td>
                  <td>
                    <div className="main__table-btns">
                      <button
                        className="main__table-btn main__table-btn--edit"
                        onClick={() =>
                          history.push(`/manager/edit-room?roomId=${room._id}`)
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
                        onClick={() => onOpen(room)}
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
      <DeleteRoom open={openDelete} roomData={selectedRoom} close={onClose} />
    </div>
  );
};

export default RoomList;
