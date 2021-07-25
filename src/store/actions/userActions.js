import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
  EDIT_USER_PROFILE,
  EDIT_USER_PROFILE_START,
  EDIT_USER_PROFILE_SUCCESS,
  EDIT_USER_PROFILE_FAILED,
} from "./types";

export const getUserProfile = () => ({
  type: GET_USER_PROFILE,
});

export const getUserProfileStart = () => ({
  type: GET_USER_PROFILE_START,
});

export const getUserProfileSuccess = (payload) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload,
});

export const getUserProfileFailed = (payload) => ({
  type: GET_USER_PROFILE_FAILED,
  payload,
});

export const editUserProfile = (data) => ({
  type: EDIT_USER_PROFILE,
  data,
});

export const editUserProfileStart = () => ({
  type: EDIT_USER_PROFILE_START,
});

export const editUserProfileSuccess = (payload) => ({
  type: EDIT_USER_PROFILE_SUCCESS,
  payload,
});

export const editUserProfileFailed = (payload) => ({
  type: EDIT_USER_PROFILE_FAILED,
  payload,
});
