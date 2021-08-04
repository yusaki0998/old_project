/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListSlot } from "../../store/actions/managerActions";
import SlotList from "../../components/manager/SlotList";
import SlotForm from "../../components/manager/SlotForm";
import Paginator from "../../components/shared/Paginator";
import { MAX_ITEMS_PER_PAGE } from "./FilmRoom";
import { Helmet } from "react-helmet";

const ViewSlot = () => {
  const dispatch = useDispatch();
  const { slot } = useSelector((state) => state.manager);
  const [filteredList, setFilteredList] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [openSlotForm, setOpenSlotForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({});

  useEffect(() => {
    dispatch(getListSlot());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(slot.list);
  }, [slot.list]);

  const onOpen = (slotData) => {
    setSelectedSlot(slotData);
    setOpenSlotForm(true);
  };

  const onClose = () => {
    setOpenSlotForm(false);
    setSelectedSlot({});
  };

  return (
    <div className="tab-pane">
      <Helmet>
        <title> Slot chiếu </title>
      </Helmet>
      <div className="row">
        <div className="col-12 col-sm-10">
          <div className="d-flex align-items-center my-4">
            <button
              className="btn__outline-orange ml-0"
              onClick={() => onOpen({})}
            >
              Tạo giờ chiếu
            </button>
          </div>
          <SlotList
            isLoading={slot.isLoading}
            list={filteredList.slice(
              curPage * MAX_ITEMS_PER_PAGE,
              (curPage + 1) * MAX_ITEMS_PER_PAGE
            )}
            onEditSlot={onOpen}
          />
          <Paginator
            curPage={curPage}
            maxPage={Math.ceil(filteredList.length / MAX_ITEMS_PER_PAGE)}
            setCurPage={setCurPage}
            totalItems={filteredList.length}
          />
          <SlotForm
            open={openSlotForm}
            close={onClose}
            slotData={selectedSlot}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewSlot;
