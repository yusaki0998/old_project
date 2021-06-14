/** @format */

import { all, fork } from "redux-saga/effects";
import authWatcher from "./auth";
import userWatcher from "./user";
import adminWatcher from "./admin";

function* rootSaga() {
  yield all([fork(authWatcher), fork(userWatcher), fork(adminWatcher)]);
}

export default rootSaga;
