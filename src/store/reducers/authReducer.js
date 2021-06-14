/** @format */

import {
  SIGN_UP_FAILED,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
  EDIT_USER_PROFILE_SUCCESS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("customerAuthToken")
    ? localStorage.getItem("customerAuthToken")
    : null,
  isAuthenticated: localStorage.getItem("customerAuthToken") ? true : false,
  signUp: {
    isLoading: false,
    error: null,
    success: false,
    data: null,
  },
  loginData: {
    isLoading: false,
    error: null,
    success: false,
    data: localStorage.getItem("customerAuthData")
      ? JSON.parse(localStorage.getItem("customerAuthData"))
      : null,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP_START:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isLoading: true,
          error: null,
        },
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isLoading: false,
          error: null,
          success: true,
          data: payload,
        },
      };
    case SIGN_UP_FAILED:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isLoading: false,
          success: false,
          error: payload,
        },
      };
    case LOGIN_START:
      return {
        ...state,
        loginData: {
          ...state.loginData,
          isLoading: true,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginData: {
          ...state.loginData,
          isLoading: false,
          success: true,
          data: payload.user,
        },
        isAuthenticated: true,
        token: payload.accessToken,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loginData: {
          ...state.loginData,
          isLoading: false,
          data: null,
          error: payload,
        },
        isAuthenticated: false,
        token: null,
      };
    case LOGOUT:
      localStorage.removeItem("customerAuthToken");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        signUp: {
          isLoading: false,
          error: null,
          success: false,
          data: null,
        },
        loginData: {
          isLoading: false,
          error: null,
          success: false,
          data: null,
        },
      };
    case GET_USER_PROFILE_START:
      return {
        ...state,
        loginData: {
          ...state.loginData,
          isLoading: true,
          error: null,
        },
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loginData: {
          ...state.loginData,
          isLoading: false,
          error: null,
          data: payload,
        },
      };
    case GET_USER_PROFILE_FAILED:
      return {
        ...state,
        loginData: {
          ...state.loginData,
          isLoading: false,
          error: payload,
        },
      };
    case EDIT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loginData: {
          ...state.loginData,
          isLoading: false,
          error: null,
          data: payload.data,
        },
      };
    default:
      return state;
  }
};

export default reducer;
