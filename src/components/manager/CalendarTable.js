/** @format */

import React, { useState } from "react";
import SlotListSkeleton from "../../skeleton/SlotListSkeleton";
import WeekPicker from "../shared/WeekPicker";
import OutsideHandler from "../shared/ClickWrapper";
import ScheduleSkeleton from "../../skeleton/ScheduleSkeleton";
import ScheduleEditForm from "./ScheduleEditForm";
import { useSelector } from "react-redux";

const convertDateString = (daysArr) => {
  const convertedDates = [];
  daysArr.forEach((date) => {
    const dateItem = new Date(date);
    const dateStr = `${dateItem.getFullYear()}-${
      dateItem.getMonth() + 1 > 9
        ? dateItem.getMonth() + 1
        : `0${dateItem.getMonth() + 1}-${
            dateItem.getDate() > 9
              ? dateItem.getDate()
              : `0${dateItem.getDate()}`
          }`
    }`;
    convertedDates.push(dateStr);
  });
  return convertedDates;
};

const CalendarTable = ({
  isLoading,
  slotList,
  fetchListScheduleHandler,
  listSchedules,
  loadingSchedules,
}) => {
  const { comingFilm, currentFilm } = useSelector((state) => state.manager);
  const [isShowWeekPicker, setIsShowWeekPicker] = useState(false);
  const [days, setDays] = useState([]);
  const [weekNum, setWeekNum] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [dayInWeekNum, setDayInWeekNum] = useState(0);

  const convertedDates = convertDateString(days);

  const allFilm = [...comingFilm.list, ...currentFilm.list];

  const findSchedule = (slotId, dateStr) => {
    const scheduleItem = listSchedules.find(
      (item) => item?.slot?._id === slotId && item?.showDate?.includes(dateStr)
    );
    return scheduleItem?.movie?.movieName || "-";
  };

  const onEditSchedule = (slotId, dateStr, dayInWeek) => {
    const scheduleItem = listSchedules.find(
      (item) => item?.slot?._id === slotId && item?.showDate?.includes(dateStr)
    );
    if (!scheduleItem) {
      return "";
    }
    setSelectedSchedule(scheduleItem);
    setDayInWeekNum(dayInWeek);
    setOpenEdit(true);
  };

  return (
    <div className="admin__manager-list__wrapper">
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="week__picker-container">
          <button
            className="btn__outline-orange ml-0 btn-sm"
            onClick={() => setIsShowWeekPicker((prevState) => !prevState)}
          >
            Chọn Tuần
          </button>
          {isShowWeekPicker && (
            <OutsideHandler callback={() => setIsShowWeekPicker(false)}>
              <WeekPicker
                callback={(week, daysData) => {
                  fetchListScheduleHandler(week);
                  setWeekNum(week);
                  setDays(daysData);
                  setIsShowWeekPicker(false);
                }}
              />
            </OutsideHandler>
          )}
        </div>
        <button
          className="btn__outline-orange"
          onClick={() => setIsShowWeekPicker((prevState) => !prevState)}
        >
          Lịch chiếu mới
        </button>
      </div>
      <div className="main__table-wrap">
        <table className="border_table">
          <thead>
            <tr className="text-white">
              <th>Slot</th>
              <th>Thứ 2</th>
              <th>Thứ 3</th>
              <th>Thứ 4</th>
              <th>Thứ 5</th>
              <th>Thứ 6</th>
              <th>Thứ 7</th>
              <th>Chủ Nhật</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekNum && <td className="text-white">Tuần : {weekNum} </td>}
              {convertedDates?.map((dateIt) => (
                <td className="text-white f-13" key={dateIt}>
                  {dateIt}
                </td>
              ))}
            </tr>
            {isLoading && <SlotListSkeleton />}
            {!isLoading &&
              slotList?.map((slot) => (
                <tr key={slot._id}>
                  <td>
                    <div className="text-schedule">{slot.slotName}</div>
                  </td>
                  {loadingSchedules && <ScheduleSkeleton />}
                  {!loadingSchedules && (
                    <>
                      <td>
                        <div
                          className="text-schedule"
                          onClick={() =>
                            onEditSchedule(slot._id, convertedDates?.[0], 0)
                          }
                        >
                          {findSchedule(slot._id, convertedDates?.[0])}
                        </div>
                      </td>
                      <td>
                        <div
                          className="text-schedule"
                          onClick={() =>
                            onEditSchedule(slot._id, convertedDates?.[1], 1)
                          }
                        >
                          {findSchedule(slot._id, convertedDates?.[1])}
                        </div>
                      </td>
                      <td>
                        <div
                          className="text-schedule"
                          onClick={() =>
                            onEditSchedule(slot._id, convertedDates?.[2], 2)
                          }
                        >
                          {findSchedule(slot._id, convertedDates?.[2])}
                        </div>
                      </td>
                      <td>
                        <div
                          className="text-schedule"
                          onClick={() =>
                            onEditSchedule(slot._id, convertedDates?.[3], 3)
                          }
                        >
                          {findSchedule(slot._id, convertedDates?.[3])}
                        </div>
                      </td>
                      <td>
                        <div
                          className="text-schedule"
                          onClick={() =>
                            onEditSchedule(slot._id, convertedDates?.[4], 4)
                          }
                        >
                          {findSchedule(slot._id, convertedDates?.[4])}
                        </div>
                      </td>
                      <td>
                        <div
                          className="text-schedule"
                          onClick={() =>
                            onEditSchedule(slot._id, convertedDates?.[5], 5)
                          }
                        >
                          {findSchedule(slot._id, convertedDates?.[5])}
                        </div>
                      </td>
                      <td>
                        <div
                          className="text-schedule"
                          onClick={() =>
                            onEditSchedule(slot._id, convertedDates?.[6], 6)
                          }
                        >
                          {findSchedule(slot._id, convertedDates?.[6])}
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ScheduleEditForm
        open={openEdit}
        close={() => {
          setOpenEdit(false);
          setSelectedSchedule({});
        }}
        scheduleData={selectedSchedule}
        dayInWeekNum={dayInWeekNum}
        allFilm={allFilm}
        fetchListScheduleAfterUpdate={() => fetchListScheduleHandler(weekNum)}
      />
    </div>
  );
};

export default CalendarTable;
