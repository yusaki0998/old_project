/** @format */

import { takeLatest } from "@redux-saga/core/effects";
import { put, delay, takeEvery } from "redux-saga/effects";
import {
  getListManagerStart,
  getListManagerSuccess,
  getListManagerFailed,
  createAccountStart,
  createAccountFailed,
  createAccountSuccess,
  getListStaffStart,
  getListStaffSuccess,
  getListStaffFailed,
  updateAccountInfoStart,
  updateAccountInfoSuccess,
  updateAccountInfoFailed,
} from "../actions/adminActions";
import {
  CREATE_ACCOUNT,
  GET_LIST_MANAGER,
  GET_LIST_STAFF,
  UPDATE_ACCOUNT_INFO,
} from "../actions/types";
import {
  addAccountRequest,
  getManagerListRequest,
  getStaffListRequest,
  updateAccountInfoRequest,
} from "../api/admin";
import { v4 as uuid_v4 } from "uuid";
import { addNotification, removeNotification } from "../actions/uiActions";

function* getListManagersWorker() {
  yield put(getListManagerStart());
  try {
    const { data } = yield getManagerListRequest();
    yield put(getListManagerSuccess(data));
  } catch (error) {
    yield put(getListManagerFailed(error));
  }
}

function* getListStaffsWorker() {
  yield put(getListStaffStart());
  try {
    const { data } = yield getStaffListRequest();
    yield put(getListStaffSuccess(data));
  } catch (error) {
    yield put(getListStaffFailed(error));
  }
}

function* createAccountWorker(action) {
  yield put(createAccountStart());
  try {
    const { data } = yield addAccountRequest(action.data);
    yield put(createAccountSuccess(data));
    const newNoti = {
      id: uuid_v4(),
      type: "success",
      message: "Tạo mới tài khoản thành công!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
  } catch (error) {
    const newNoti = {
      id: uuid_v4(),
      type: "error",
      message: error?.response?.data?.message || "Tạo mới tài khoản thất bại!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
    yield put(createAccountFailed(error));
  }
}

function* updateAccountWorker(action) {
  yield put(updateAccountInfoStart());
  try {
    const { data } = yield updateAccountInfoRequest(action.uId, action.data);
    yield put(updateAccountInfoSuccess(data));
    const newNoti = {
      id: uuid_v4(),
      type: "success",
      message: "Cập nhật tài khoản thành công!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
  } catch (error) {
    const newNoti = {
      id: uuid_v4(),
      type: "error",
      message: error?.response?.data?.message || "Cập nhật tài khoản thất bại!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
    yield put(updateAccountInfoFailed(error));
  }
}

function* adminWatcher() {
  yield takeEvery(GET_LIST_MANAGER, getListManagersWorker);
  yield takeEvery(GET_LIST_STAFF, getListStaffsWorker);
  yield takeLatest(CREATE_ACCOUNT, createAccountWorker);
  yield takeLatest(UPDATE_ACCOUNT_INFO, updateAccountWorker);
}

export default adminWatcher;
