import { all, fork } from "redux-saga/effects";
import authWatcher from "./auth";
import userWatcher from "./user";

function* rootSaga() {
  yield all([fork(authWatcher), fork(userWatcher)]);
}

export default rootSaga;
