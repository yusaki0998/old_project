/** @format */

import React, { useState, useEffect } from "react";
import SlotListSkeleton from "../../skeleton/SlotListSkeleton";
import WeekPicker from "../shared/WeekPicker";
import OutsideHandler from "../shared/ClickWrapper";
import ScheduleSkeleton from "../../skeleton/ScheduleSkeleton";
import ScheduleEditForm from "./ScheduleEditForm";
import { useSelector } from "react-redux";
import NewScheduleForm from "./NewSchedule";
import { getCurrentWeekNum } from "../../utils/helper";

const convertDateString = (daysArr) => {
  const convertedDates = [];
  daysArr.forEach((date) => {
    const dateItem = new Date(date);
    const monthStr =
      dateItem.getMonth() + 1 > 9
        ? `${dateItem.getMonth() + 1}`
        : `0${dateItem.getMonth() + 1}`;
    const dayStr =
      dateItem.getDate() > 9
        ? `${dateItem.getDate()}`
        : `0${dateItem.getDate()}`;
    const dateStr = `${dateItem.getFullYear()}-${monthStr}-${dayStr}`;
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
  listRoom,
}) => {
  const { comingFilm, currentFilm } = useSelector((state) => state.manager);
  const [isShowWeekPicker, setIsShowWeekPicker] = useState(false);
  const [days, setDays] = useState([]);
  const [weekNum, setWeekNum] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [openNewSchedule, setOpenNewSchedule] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [dayInWeekNum, setDayInWeekNum] = useState(0);
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const convertedDates = convertDateString(days);

  const allFilm = [...comingFilm.list, ...currentFilm.list];

  const { currentWeekNum, dates } = getCurrentWeekNum();

  useEffect(() => {
    setWeekNum(currentWeekNum);
    setDays(dates);
    fetchListScheduleHandler(currentWeekNum);
    // eslint-disable-next-line
  }, []);

  const findSchedule = (slotId, dateStr) => {
    const scheduleItems = listSchedules.filter(
      (item) => item?.slot?._id === slotId && item?.showDate?.includes(dateStr)
    );
    return scheduleItems || [];
  };

  const onEditSchedule = (slotData, dateStr, dayInWeek, scheduleId) => {
    const scheduleItem = scheduleId
      ? listSchedules.find((item) => item._id === scheduleId)
      : listSchedules.find(
          (item) =>
            item?.slot?._id === slotData?._id &&
            item?.showDate?.includes(dateStr)
        );
    if (!convertedDates.length) {
      return "";
    }
    if (!scheduleItem) {
      setOpenNewSchedule(true);
      setSelectedSlotId(slotData);
      setDayInWeekNum(dayInWeek);
      const dateStrArr = dateStr?.split("-");
      if (!dateStr.length) {
        setSelectedDate(dateStr);
        return "";
      }
      setSelectedDate(
        `${dateStrArr?.[1]}/${dateStrArr?.[2]}/${dateStrArr?.[0]}`
      );
      return "";
    }
    setSelectedSchedule(scheduleItem);
    setDayInWeekNum(dayInWeek);
    setOpenEdit(true);
  };

  const onNewSchedule = (slotData, dateStr, dayInWeek) => {
    setOpenNewSchedule(true);
    setSelectedSlotId(slotData);
    setDayInWeekNum(dayInWeek);
    const dateStrArr = dateStr?.split("-");
    if (!dateStr.length) {
      setSelectedDate(dateStr);
      return "";
    }
    setSelectedDate(`${dateStrArr?.[1]}/${dateStrArr?.[2]}/${dateStrArr?.[0]}`);
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
      </div>
      <div
        className="main__table-wrap"
        style={{
          borderRadius: 3,
        }}
      >
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
                        {findSchedule(slot._id, convertedDates?.[0]).length >
                        0 ? (
                          <div className="d-flex align-items-center">
                            <div className="group__text-schedule flex-1">
                              {findSchedule(slot._id, convertedDates?.[0])?.map(
                                (item) => (
                                  <div
                                    className="text-schedule"
                                    onClick={() =>
                                      onEditSchedule(
                                        slot,
                                        convertedDates?.[0],
                                        0,
                                        item._id
                                      )
                                    }
                                    key={item._id}
                                  >
                                    {item?.movie?.movieName}
                                  </div>
                                )
                              )}
                            </div>
                            <div
                              className="new__schedule text-white cursor-pointer pr-2 font-bold w-50"
                              onClick={() =>
                                onNewSchedule(slot, convertedDates?.[0], 0)
                              }
                            >
                              +
                            </div>
                          </div>
                        ) : (
                          <div
                            className="text-schedule font-bold"
                            onClick={() =>
                              onEditSchedule(slot, convertedDates?.[0], 0)
                            }
                          >
                            +
                          </div>
                        )}
                      </td>
                      <td>
                        {findSchedule(slot._id, convertedDates?.[1]).length >
                        0 ? (
                          <div className="d-flex align-items-center">
                            <div className="group__text-schedule flex-1">
                              {findSchedule(slot._id, convertedDates?.[1])?.map(
                                (item) => (
                                  <div
                                    className="text-schedule"
                                    onClick={() =>
                                      onEditSchedule(
                                        slot,
                                        convertedDates?.[1],
                                        1,
                                        item._id
                                      )
                                    }
                                    key={item._id}
                                  >
                                    {item?.movie?.movieName}
                                  </div>
                                )
                              )}
                            </div>
                            <div
                              className="new__schedule text-white cursor-pointer pr-2 font-bold w-50"
                              onClick={() =>
                                onNewSchedule(slot, convertedDates?.[1], 1)
                              }
                            >
                              +
                            </div>
                          </div>
                        ) : (
                          <div
                            className="text-schedule font-bold"
                            onClick={() =>
                              onEditSchedule(slot, convertedDates?.[1], 1)
                            }
                          >
                            +
                          </div>
                        )}
                      </td>
                      <td>
                        {findSchedule(slot._id, convertedDates?.[2]).length >
                        0 ? (
                          <div className="d-flex align-items-center">
                            <div className="group__text-schedule flex-1">
                              {findSchedule(slot._id, convertedDates?.[2])?.map(
                                (item) => (
                                  <div
                                    className="text-schedule"
                                    onClick={() =>
                                      onEditSchedule(
                                        slot,
                                        convertedDates?.[2],
                                        2,
                                        item._id
                                      )
                                    }
                                    key={item._id}
                                  >
                                    {item?.movie?.movieName}
                                  </div>
                                )
                              )}
                            </div>
                            <div
                              className="new__schedule text-white cursor-pointer pr-2 font-bold w-50"
                              onClick={() =>
                                onNewSchedule(slot, convertedDates?.[2], 2)
                              }
                            >
                              +
                            </div>
                          </div>
                        ) : (
                          <div
                            className="text-schedule font-bold"
                            onClick={() =>
                              onEditSchedule(slot, convertedDates?.[2], 2)
                            }
                          >
                            +
                          </div>
                        )}
                      </td>
                      <td>
                        {findSchedule(slot._id, convertedDates?.[3]).length >
                        0 ? (
                          <div className="d-flex align-items-center">
                            <div className="group__text-schedule flex-1">
                              {findSchedule(slot._id, convertedDates?.[3])?.map(
                                (item) => (
                                  <div
                                    className="text-schedule"
                                    onClick={() =>
                                      onEditSchedule(
                                        slot,
                                        convertedDates?.[3],
                                        3,
                                        item._id
                                      )
                                    }
                                    key={item._id}
                                  >
                                    {item?.movie?.movieName}
                                  </div>
                                )
                              )}
                            </div>
                            <div
                              className="new__schedule text-white cursor-pointer pr-2 font-bold w-50"
                              onClick={() =>
                                onNewSchedule(slot, convertedDates?.[3], 3)
                              }
                            >
                              +
                            </div>
                          </div>
                        ) : (
                          <div
                            className="text-schedule font-bold"
                            onClick={() =>
                              onEditSchedule(slot, convertedDates?.[3], 3)
                            }
                          >
                            +
                          </div>
                        )}
                      </td>
                      <td>
                        {findSchedule(slot._id, convertedDates?.[4]).length >
                        0 ? (
                          <div className="d-flex align-items-center">
                            <div className="group__text-schedule flex-1">
                              {findSchedule(slot._id, convertedDates?.[4])?.map(
                                (item) => (
                                  <div
                                    className="text-schedule"
                                    onClick={() =>
                                      onEditSchedule(
                                        slot,
                                        convertedDates?.[4],
                                        4,
                                        item._id
                                      )
                                    }
                                    key={item._id}
                                  >
                                    {item?.movie?.movieName}
                                  </div>
                                )
                              )}
                            </div>
                            <div
                              className="new__schedule text-white cursor-pointer pr-2 font-bold w-50"
                              onClick={() =>
                                onNewSchedule(slot, convertedDates?.[4], 4)
                              }
                            >
                              +
                            </div>
                          </div>
                        ) : (
                          <div
                            className="text-schedule font-bold"
                            onClick={() =>
                              onEditSchedule(slot, convertedDates?.[4], 4)
                            }
                          >
                            +
                          </div>
                        )}
                      </td>
                      <td>
                        {findSchedule(slot._id, convertedDates?.[5]).length >
                        0 ? (
                          <div className="d-flex align-items-center">
                            <div className="group__text-schedule flex-1">
                              {findSchedule(slot._id, convertedDates?.[5])?.map(
                                (item) => (
                                  <div
                                    className="text-schedule"
                                    onClick={() =>
                                      onEditSchedule(
                                        slot,
                                        convertedDates?.[5],
                                        5,
                                        item._id
                                      )
                                    }
                                    key={item._id}
                                  >
                                    {item?.movie?.movieName}
                                  </div>
                                )
                              )}
                            </div>
                            <div
                              className="new__schedule text-white cursor-pointer pr-2 font-bold w-50"
                              onClick={() =>
                                onNewSchedule(slot, convertedDates?.[5], 5)
                              }
                            >
                              +
                            </div>
                          </div>
                        ) : (
                          <div
                            className="text-schedule font-bold"
                            onClick={() =>
                              onEditSchedule(slot, convertedDates?.[5], 5)
                            }
                          >
                            +
                          </div>
                        )}
                      </td>
                      <td>
                        {findSchedule(slot._id, convertedDates?.[6]).length >
                        0 ? (
                          <div className="d-flex align-items-center">
                            <div className="group__text-schedule flex-1">
                              {findSchedule(slot._id, convertedDates?.[6])?.map(
                                (item) => (
                                  <div
                                    className="text-schedule"
                                    onClick={() =>
                                      onEditSchedule(
                                        slot,
                                        convertedDates?.[6],
                                        6,
                                        item._id
                                      )
                                    }
                                    key={item._id}
                                  >
                                    {item?.movie?.movieName}
                                  </div>
                                )
                              )}
                            </div>
                            <div
                              className="new__schedule text-white cursor-pointer pr-2 font-bold w-50"
                              onClick={() =>
                                onNewSchedule(slot, convertedDates?.[6], 6)
                              }
                            >
                              +
                            </div>
                          </div>
                        ) : (
                          <div
                            className="text-schedule font-bold"
                            onClick={() =>
                              onEditSchedule(slot, convertedDates?.[6], 6)
                            }
                          >
                            +
                          </div>
                        )}
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
        listRoom={listRoom}
      />
      <NewScheduleForm
        open={openNewSchedule}
        close={() => {
          setOpenNewSchedule(false);
          setSelectedDate("");
          setSelectedSlotId("");
        }}
        allFilm={allFilm}
        listRoom={listRoom}
        slotId={selectedSlotId}
        selectedDate={selectedDate}
        fetchListScheduleHandler={() => fetchListScheduleHandler(weekNum)}
        dayInWeekNum={dayInWeekNum}
      />
    </div>
  );
};

export default CalendarTable;
