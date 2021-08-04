/** @format */

import React, { useState } from "react";
import SlotListSkeleton from "../../skeleton/SlotListSkeleton";
import { convertTime } from "../../utils/helper";
import DeleteSlot from "./DeleteSlot";

const SlotList = ({ list, isLoading, onEditSlot }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({});

  const onOpen = (slot) => {
    setSelectedSlot(slot);
    setOpenDelete(true);
  };

  const onClose = () => {
    setOpenDelete(false);
    setTimeout(() => {
      setSelectedSlot({});
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
              <th>Sửa/Xóa</th>
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
                      {convertTime(slot.startTime)} -{" "}
                      {convertTime(slot.endTime)}
                    </div>
                  </td>
                  <td>
                    <div className="main__table-btns">
                      <button
                        className="main__table-btn main__table-btn--edit"
                        onClick={() => onEditSlot(slot)}
                      >
                        <i className="icon ion-ios-create"></i>
                      </button>
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
      <DeleteSlot open={openDelete} slotData={selectedSlot} close={onClose} />
    </div>
  );
};

export default SlotList;
