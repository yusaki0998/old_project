/** @format */

import {
  GET_LIST_MANAGER,
  GET_LIST_MANAGER_START,
  GET_LIST_MANAGER_SUCCESS,
  GET_LIST_MANAGER_FAILED,
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_START,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILED,
  RESET_CREATE_ACCOUNT_STATE,
  GET_LIST_STAFF,
  GET_LIST_STAFF_START,
  GET_LIST_STAFF_SUCCESS,
  GET_LIST_STAFF_FAILED,
  REMOVE_ACCOUNT_FROM_STATE,
  UPDATE_ACCOUNT_INFO,
  UPDATE_ACCOUNT_INFO_START,
  UPDATE_ACCOUNT_INFO_SUCCESS,
  UPDATE_ACCOUNT_INFO_FAILED,
  RESET_UPDATE_ACCOUNT_STATE,
} from "./types";

export const getListManager = () => ({
  type: GET_LIST_MANAGER,
});

export const getListManagerStart = () => ({
  type: GET_LIST_MANAGER_START,
});

export const getListManagerSuccess = (payload) => ({
  type: GET_LIST_MANAGER_SUCCESS,
  payload,
});

export const getListManagerFailed = (payload) => ({
  type: GET_LIST_MANAGER_FAILED,
  payload,
});

export const getListStaff = () => ({
  type: GET_LIST_STAFF,
});

export const getListStaffStart = () => ({
  type: GET_LIST_STAFF_START,
});

export const getListStaffSuccess = (payload) => ({
  type: GET_LIST_STAFF_SUCCESS,
  payload,
});

export const getListStaffFailed = (payload) => ({
  type: GET_LIST_STAFF_FAILED,
  payload,
});

export const createAccount = (data) => ({
  type: CREATE_ACCOUNT,
  data,
});

export const createAccountStart = () => ({
  type: CREATE_ACCOUNT_START,
});

export const createAccountSuccess = (payload) => ({
  type: CREATE_ACCOUNT_SUCCESS,
  payload,
});

export const createAccountFailed = (payload) => ({
  type: CREATE_ACCOUNT_FAILED,
  payload,
});

export const resetCreateAccountState = () => ({
  type: RESET_CREATE_ACCOUNT_STATE,
});

export const removeAccountFromState = (uId, role) => ({
  type: REMOVE_ACCOUNT_FROM_STATE,
  payload: { uId, role },
});

export const updateAccountInfo = (uId, data) => ({
  type: UPDATE_ACCOUNT_INFO,
  uId,
  data,
});

export const updateAccountInfoStart = () => ({
  type: UPDATE_ACCOUNT_INFO_START,
});

export const updateAccountInfoSuccess = (payload) => ({
  type: UPDATE_ACCOUNT_INFO_SUCCESS,
  payload,
});

export const updateAccountInfoFailed = (payload) => ({
  type: UPDATE_ACCOUNT_INFO_FAILED,
  payload,
});

export const resetUpdateAccountState = () => ({
  type: RESET_UPDATE_ACCOUNT_STATE,
});
