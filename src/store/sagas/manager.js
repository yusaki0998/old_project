/** @format */

import { takeLatest } from "@redux-saga/core/effects";
import { put, delay, takeEvery } from "redux-saga/effects";
import {
  getListCurrentFilmFailed,
  getListCurrentFilmStart,
  getListCurrentFilmSuccess,
  createNewFilmStart,
  createNewFilmSuccess,
  createNewFilmFailed,
  getListComingFilmStart,
  getListComingFilmSuccess,
  getListComingFilmFailed,
  updateFilmInfoStart,
  updateFilmInfoSuccess,
  updateFilmInfoFailed,
  getListRoomStart,
  getListRoomSuccess,
  getListRoomFailed,
  createRoomStart,
  createRoomSuccess,
  createRoomFailed,
  updateRoomInfoStart,
  updateRoomInfoSuccess,
  updateRoomInfoFailed,
  getListSlotStart,
  getListSlotSuccess,
  getListSlotFailed,
  createSlotStart,
  createSlotSuccess,
  createSlotFailed,
  updateSlotInfoStart,
  updateSlotInfoSuccess,
  updateSlotInfoFailed,
} from "../actions/managerActions";
import {
  GET_LIST_CURRENT_FILM,
  CREATE_NEW_FILM,
  GET_LIST_COMING_FILM,
  UPDATE_FILM_INFO,
  GET_LIST_ROOM,
  CREATE_ROOM,
  UPDATE_ROOM_INFO,
  GET_LIST_SLOT,
  CREATE_SLOT,
  UPDATE_SLOT_INFO,
} from "../actions/types";
import {
  getListCurrentFilmRequest,
  createNewFilmRequest,
  getListComingFilmRequest,
  updateFilmInfoRequest,
  getListRoomRequest,
  createRoomRequest,
  updateRoomInfoRequest,
  getListSlotRequest,
  createSlotRequest,
  updateSlotInfoRequest,
} from "../api/manager";
import { v4 as uuid_v4 } from "uuid";
import { addNotification, removeNotification } from "../actions/uiActions";

function* getListCurrentFilmWorker() {
  yield put(getListCurrentFilmStart());
  try {
    const { data } = yield getListCurrentFilmRequest();
    yield put(getListCurrentFilmSuccess(data));
  } catch (error) {
    yield put(getListCurrentFilmFailed(error));
  }
}

function* createNewFilmWorker(action) {
  yield put(createNewFilmStart());
  try {
    const { data } = yield createNewFilmRequest(action.data);
    yield put(createNewFilmSuccess(data));
    const newNoti = {
      id: uuid_v4(),
      type: "success",
      message: "Tạo mới phim thành công!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
  } catch (error) {
    const newNoti = {
      id: uuid_v4(),
      type: "error",
      message: error?.response?.data?.message || "Tạo mới phim thất bại!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
    yield put(createNewFilmFailed(error));
  }
}

function* getListComingFilmWorker() {
  yield put(getListComingFilmStart());
  try {
    const { data } = yield getListComingFilmRequest();
    yield put(getListComingFilmSuccess(data));
  } catch (error) {
    yield put(getListComingFilmFailed(error));
  }
}

function* updateFilmInfoWorker(action) {
  yield put(updateFilmInfoStart());
  try {
    const { data } = yield updateFilmInfoRequest(action.filmId, action.data);
    yield put(updateFilmInfoSuccess(data));
    const newNoti = {
      id: uuid_v4(),
      type: "success",
      message: "Cập nhật phim thành công!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
  } catch (error) {
    const newNoti = {
      id: uuid_v4(),
      type: "error",
      message: error?.response?.data?.message || "Cập nhật phim thất bại!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
    yield put(updateFilmInfoFailed(error));
  }
}

function* getListRoomWorker() {
  yield put(getListRoomStart());
  try {
    const { data } = yield getListRoomRequest();
    yield put(getListRoomSuccess(data));
  } catch (error) {
    yield put(getListRoomFailed(error));
  }
}

function* createNewRoomWorker(action) {
  yield put(createRoomStart());
  try {
    const { data } = yield createRoomRequest(action.data);
    yield put(createRoomSuccess(data));
    const newNoti = {
      id: uuid_v4(),
      type: "success",
      message: "Tạo mới phòng thành công!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
  } catch (error) {
    const newNoti = {
      id: uuid_v4(),
      type: "error",
      message: error?.response?.data?.message || "Tạo mới phòng thất bại!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
    yield put(createRoomFailed(error));
  }
}

function* updateRoomInfoWorker(action) {
  yield put(updateRoomInfoStart());
  try {
    const { data } = yield updateRoomInfoRequest(action.roomId, action.data);
    yield put(updateRoomInfoSuccess(data));
    const newNoti = {
      id: uuid_v4(),
      type: "success",
      message: "Cập nhật phòng chiếu thành công!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
  } catch (error) {
    const newNoti = {
      id: uuid_v4(),
      type: "error",
      message:
        error?.response?.data?.message || "Cập nhật phòng chiếu thất bại!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
    yield put(updateRoomInfoFailed(error));
  }
}

function* getListSlotWorker() {
  yield put(getListSlotStart());
  try {
    const { data } = yield getListSlotRequest();
    yield put(getListSlotSuccess(data));
  } catch (error) {
    yield put(getListSlotFailed(error));
  }
}

function* createNewSlotWorker(action) {
  yield put(createSlotStart());
  try {
    const { data } = yield createSlotRequest(action.data);
    yield put(createSlotSuccess(data));
    const newNoti = {
      id: uuid_v4(),
      type: "success",
      message: "Tạo mới slot thành công!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
  } catch (error) {
    const newNoti = {
      id: uuid_v4(),
      type: "error",
      message: error?.response?.data?.message || "Tạo mới slot thất bại!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
    yield put(createSlotFailed(error));
  }
}

function* updateSlotInfoWorker(action) {
  yield put(updateSlotInfoStart());
  try {
    const { data } = yield updateSlotInfoRequest(action.slotId, action.data);
    yield put(updateSlotInfoSuccess(data));
    const newNoti = {
      id: uuid_v4(),
      type: "success",
      message: "Cập nhật phòng chiếu thành công!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
  } catch (error) {
    const newNoti = {
      id: uuid_v4(),
      type: "error",
      message:
        error?.response?.data?.message || "Cập nhật phòng chiếu thất bại!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
    yield put(updateSlotInfoFailed(error));
  }
}

function* managerWatcher() {
  yield takeEvery(GET_LIST_CURRENT_FILM, getListCurrentFilmWorker);
  yield takeLatest(CREATE_NEW_FILM, createNewFilmWorker);
  yield takeEvery(GET_LIST_COMING_FILM, getListComingFilmWorker);
  yield takeLatest(UPDATE_FILM_INFO, updateFilmInfoWorker);
  yield takeEvery(GET_LIST_ROOM, getListRoomWorker);
  yield takeLatest(CREATE_ROOM, createNewRoomWorker);
  yield takeLatest(UPDATE_ROOM_INFO, updateRoomInfoWorker);
  yield takeEvery(GET_LIST_SLOT, getListSlotWorker);
  yield takeLatest(CREATE_SLOT, createNewSlotWorker);
  yield takeLatest(UPDATE_SLOT_INFO, updateSlotInfoWorker);
}

export default managerWatcher;
