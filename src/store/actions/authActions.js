import { LOGIN_START, LOGIN_FAILED, LOGIN, LOGIN_SUCCESS } from "./types";

export const login = (email, password) => ({
  type: LOGIN,
  email,
  password,
});

export const loginStart = () => ({
  type: LOGIN_START,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailed = (payload) => ({
  type: LOGIN_FAILED,
  payload,
});
