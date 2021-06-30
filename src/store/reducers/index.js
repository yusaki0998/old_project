/** @format */

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import uiReducer from "./uiReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import managerReducer from "./managerReducer";
import globalReducer from "./globalReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  user: userReducer,
  admin: adminReducer,
  manager: managerReducer,
  global: globalReducer,
});

export default rootReducer;
