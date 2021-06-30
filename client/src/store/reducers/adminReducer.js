/** @format */

import {
  GET_LIST_MANAGER_START,
  GET_LIST_MANAGER_SUCCESS,
  GET_LIST_MANAGER_FAILED,
  CREATE_ACCOUNT_START,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILED,
  RESET_CREATE_ACCOUNT_STATE,
  GET_LIST_STAFF_START,
  GET_LIST_STAFF_SUCCESS,
  GET_LIST_STAFF_FAILED,
  REMOVE_ACCOUNT_FROM_STATE,
  UPDATE_ACCOUNT_INFO_START,
  UPDATE_ACCOUNT_INFO_SUCCESS,
  UPDATE_ACCOUNT_INFO_FAILED,
} from "../actions/types";

const initialState = {
  managers: {
    list: [],
    isLoading: false,
    error: null,
  },
  staffs: {
    list: [],
    isLoading: false,
    error: null,
  },
  createAccount: {
    isLoading: false,
    error: null,
    success: false,
    data: {},
  },
  updateAccount: {
    isLoading: false,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LIST_MANAGER_START:
      return {
        ...state,
        managers: {
          ...state.managers,
          isLoading: true,
        },
      };
    case GET_LIST_MANAGER_SUCCESS:
      return {
        ...state,
        managers: {
          ...state.managers,
          isLoading: false,
          error: null,
          list: payload.data,
        },
      };
    case GET_LIST_MANAGER_FAILED:
      return {
        ...state,
        managers: {
          ...state.managers,
          isLoading: false,
          error: payload,
        },
      };
    case GET_LIST_STAFF_START:
      return {
        ...state,
        staffs: {
          ...state.staffs,
          isLoading: true,
        },
      };
    case GET_LIST_STAFF_SUCCESS:
      return {
        ...state,
        staffs: {
          ...state.staffs,
          isLoading: false,
          error: null,
          list: payload.data,
        },
      };
    case GET_LIST_STAFF_FAILED:
      return {
        ...state,
        staffs: {
          ...state.staffs,
          isLoading: false,
          error: payload,
        },
      };
    case CREATE_ACCOUNT_START:
      return {
        ...state,
        createAccount: {
          ...state.createAccount,
          isLoading: true,
        },
      };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        createAccount: {
          ...state.createAccount,
          isLoading: false,
          error: null,
          success: true,
          data: payload,
        },
      };
    case CREATE_ACCOUNT_FAILED:
      return {
        ...state,
        createAccount: {
          ...state.createAccount,
          isLoading: false,
          error: payload,
          success: false,
          data: {},
        },
      };
    case UPDATE_ACCOUNT_INFO_START:
      return {
        ...state,
        updateAccount: {
          isLoading: true,
        },
      };
    case UPDATE_ACCOUNT_INFO_SUCCESS:
    case UPDATE_ACCOUNT_INFO_FAILED:
      return {
        ...state,
        updateAccount: {
          isLoading: false,
        },
      };
    case RESET_CREATE_ACCOUNT_STATE:
      return {
        ...state,
        createAccount: {
          ...state.createAccount,
          isLoading: false,
          error: null,
          success: false,
          data: {},
        },
      };
    case REMOVE_ACCOUNT_FROM_STATE:
      if (payload?.role === "manager") {
        return {
          ...state,
          managers: {
            ...state.managers,
            list: state.managers.list.filter((mn) => mn._id !== payload.uId),
          },
        };
      }
      return {
        ...state,
        staffs: {
          ...state.staffs,
          list: state.staffs.list.filter((mn) => mn._id !== payload.uId),
        },
      };
    default:
      return state;
  }
};

export default reducer;
