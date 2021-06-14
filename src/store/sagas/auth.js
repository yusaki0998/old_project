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

function* signupWoker(action) {
  yield put(signupStart());
  try {
    const { data } = yield signupRequest(action.data);
    yield put(signupSuccess(data));
    action.history.push("/signin");
    const newNoti = {
      id: uuid_v4(),
      type: "success",
      message: "Đăng ký thành công!",
    };
    yield put(addNotification(newNoti));
    yield delay(5000);
    yield put(removeNotification(newNoti.id));
  } catch (error) {
    yield put(signupFailed(error));
  }
}

function* loginWoker(action) {
  yield put(loginStart());
  try {
    const { data } = yield loginRequest(action.data);
    yield put(loginSuccess(data.data));
    yield localStorage.setItem("customerAuthToken", data.data.accessToken);
    yield localStorage.setItem(
      "customerAuthData",
      JSON.stringify(data.data.user)
    );
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.data.accessToken}`;
    if (data?.data?.user?.role === "admin") {
      action.history.push("/admin");
    } else {
      action.history.push("/");
    }
    const newNoti = {
      id: uuid_v4(),
      type: "success",
      message: "Đăng nhập thành công!",
    };
    yield put(addNotification(newNoti));
    yield delay(5000);
    yield put(removeNotification(newNoti.id));
  } catch (error) {
    const newNoti = {
      id: uuid_v4(),
      type: "error",
      message: error.message || "Đăng nhập thất bại! Vui lòng kiểm tra lại",
    };
    yield put(addNotification(newNoti));
    yield delay(5000);
    yield put(removeNotification(newNoti.id));
    yield put(loginFailed(error));
  }
}

function* authWatcher() {
  yield takeLatest(SIGN_UP, signupWoker);
  yield takeLatest(LOGIN, loginWoker);
}

export default authWatcher;
