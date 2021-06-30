/** @format */

import { put, takeEvery } from "redux-saga/effects";
import {
  globalGetListCurrentFilmFailed,
  globalGetListCurrentFilmStart,
  globalGetListCurrentFilmSuccess,
  globalGetListComingFilmStart,
  globalGetListComingFilmSuccess,
  globalGetListComingFilmFailed,
} from "../actions/globalActions";
import {
  G_GET_LIST_CURRENT_FILM,
  G_GET_LIST_COMING_FILM,
} from "../actions/types";
import {
  getListCurrentFilmRequest,
  getListComingFilmRequest,
} from "../api/global";

function* getListCurrentFilmWorker() {
  yield put(globalGetListCurrentFilmStart());
  try {
    const { data } = yield getListCurrentFilmRequest();
    yield put(globalGetListCurrentFilmSuccess(data));
  } catch (error) {
    yield put(globalGetListCurrentFilmFailed(error));
  }
}

function* getListComingFilmWorker() {
  yield put(globalGetListComingFilmStart());
  try {
    const { data } = yield getListComingFilmRequest();
    yield put(globalGetListComingFilmSuccess(data));
  } catch (error) {
    yield put(globalGetListComingFilmFailed(error));
  }
}

function* globalWatcher() {
  yield takeEvery(G_GET_LIST_CURRENT_FILM, getListCurrentFilmWorker);
  yield takeEvery(G_GET_LIST_COMING_FILM, getListComingFilmWorker);
}

export default globalWatcher;
