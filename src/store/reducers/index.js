import { combineReducers } from "redux";
import authReducer from "./authReducer";
import uiReducer from "./uiReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  user: userReducer,
});

export default rootReducer;
