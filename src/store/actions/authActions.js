import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN,
  LOGIN_SUCCESS,
  SIGN_UP,
  SIGN_UP_FAILED,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  LOGOUT,
} from "./types";

export const login = (data, history) => ({
  type: LOGIN,
  data,
  history,
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

export const signup = (data, history) => ({
  type: SIGN_UP,
  data,
  history,
});

export const signupStart = () => ({
  type: SIGN_UP_START,
});

export const signupSuccess = (payload) => ({
  type: SIGN_UP_SUCCESS,
  payload,
});

export const signupFailed = (payload) => ({
  type: SIGN_UP_FAILED,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});
