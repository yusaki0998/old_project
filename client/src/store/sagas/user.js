/** @format */

import { takeLatest } from "@redux-saga/core/effects";
import { put, delay } from "redux-saga/effects";
import {
  editUserProfileStart,
  editUserProfileSuccess,
  editUserProfileFailed,
} from "../actions/userActions";
import { EDIT_USER_PROFILE } from "../actions/types";
import { updateUserGeneralInfoRequest } from "../api/user";
import { v4 as uuid_v4 } from "uuid";
import { addNotification, removeNotification } from "../actions/uiActions";

function* editUserProfileWorker(action) {
  yield put(editUserProfileStart());
  try {
    const { data } = yield updateUserGeneralInfoRequest(action.data);
    yield put(editUserProfileSuccess(data));
    const newNoti = {
      id: uuid_v4(),
      type: "success",
      message: "Cập nhật thông tin thành công!",
    };
    yield put(addNotification(newNoti));
    yield delay(5000);
    yield put(removeNotification(newNoti.id));
  } catch (error) {
    const newNoti = {
      id: uuid_v4(),
      type: "error",
      message:
        error?.response?.data?.message ||
        "Cập nhật thông tin thất bại. Vui lòng kiểm tra & thử lại",
    };
    yield put(addNotification(newNoti));
    yield delay(5000);
    yield put(removeNotification(newNoti.id));
    yield put(editUserProfileFailed(error));
  }
}

function* userWatcher() {
  yield takeLatest(EDIT_USER_PROFILE, editUserProfileWorker);
}

export default userWatcher;
