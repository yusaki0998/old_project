/** @format */

import { all, fork } from "redux-saga/effects";
import authWatcher from "./auth";
import userWatcher from "./user";
import adminWatcher from "./admin";
import managerWatcher from "./manager";
import globalWatcher from "./global";

function* rootSaga() {
  yield all([
    fork(authWatcher),
    fork(userWatcher),
    fork(adminWatcher),
    fork(managerWatcher),
    fork(globalWatcher),
  ]);
}

export default rootSaga;
