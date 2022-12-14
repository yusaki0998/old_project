/** @format */

import { takeLatest } from "@redux-saga/core/effects";
import { put, delay } from "redux-saga/effects";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  signupFailed,
  signupStart,
  signupSuccess,
} from "../actions/authActions";
import { LOGIN, SIGN_UP } from "../actions/types";
import { signupRequest, loginRequest } from "../api/auth";
import { v4 as uuid_v4 } from "uuid";
import { addNotification, removeNotification } from "../actions/uiActions";
import axiosInstance from "../api/axios";

function* signupWorker(action) {
  yield put(signupStart());
  try {
    const { data } = yield signupRequest(action.data);
    yield put(signupSuccess(data));
    action.history.push("/verify-email");
    const newNoti = {
      id: uuid_v4(),
      type: "success",
      message: "Đăng ký thành công! Vui lòng nhập mã xác thực",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
  } catch (error) {
    const newNoti = {
      id: uuid_v4(),
      type: "error",
      message:
        error?.response?.data?.message ||
        "Đăng ký thất bại! Vui lòng kiểm tra lại",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
    yield put(signupFailed(error));
  }
}

function* loginWorker(action) {
  yield put(loginStart());
  try {
    const { data } = yield loginRequest(action.data);
    yield put(loginSuccess(data.data));
    yield localStorage.setItem("customerAuthToken", data.data.token);
    yield localStorage.setItem(
      "customerAuthData",
      JSON.stringify(data.data.user)
    );
    axiosInstance.defaults.headers.common["token"] = `${data.data.token}`;

    const newNoti = {
      id: uuid_v4(),
      type: "success",
      message: "Đăng nhập thành công!",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
  } catch (error) {
    const newNoti = {
      id: uuid_v4(),
      type: "error",
      message:
        error?.response?.data?.message ||
        "Đăng nhập thất bại! Vui lòng kiểm tra lại",
    };
    yield put(addNotification(newNoti));
    yield delay(2000);
    yield put(removeNotification(newNoti.id));
    yield put(loginFailed(error));
  }
}

function* authWatcher() {
  yield takeLatest(SIGN_UP, signupWorker);
  yield takeLatest(LOGIN, loginWorker);
}

export default authWatcher;
