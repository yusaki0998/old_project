/** @format */

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import uiReducer from "./uiReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import managerReducer from "./managerReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  user: userReducer,
  admin: adminReducer,
  manager: managerReducer,
});

export default rootReducer;
