/** @format */
/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListComingFilm,
  getListCurrentFilm,
  getListSlot,
} from "../../store/actions/managerActions";
import CalendarTable from "../../components/manager/CalendarTable";
import { getListScheduleRequest } from "../../store/api/manager";
import { Helmet } from "react-helmet";

const FilmCalendar = () => {
  const dispatch = useDispatch();
  const { slot } = useSelector((state) => state.manager);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [listSchedules, setListSchedules] = useState([]);

  useEffect(() => {
    dispatch(getListSlot());
    dispatch(getListCurrentFilm());
    dispatch(getListComingFilm());
  }, [dispatch]);

  const fetchListScheduleHandler = async (weekNum) => {
    setLoadingSchedules(true);
    try {
      const { data } = await getListScheduleRequest(weekNum);
      setListSchedules(data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSchedules(false);
    }
  };

  return (
    <div className="tab-pane">
      <Helmet>
        <title> Lịch chiếu </title>
      </Helmet>
      <div className="d-flex justify-content-between align-items-center my-4"></div>
      <CalendarTable
        fetchListScheduleHandler={fetchListScheduleHandler}
        slotList={slot.list}
        loadingSchedules={loadingSchedules}
        listSchedules={listSchedules}
      />
    </div>
  );
};

export default FilmCalendar;
