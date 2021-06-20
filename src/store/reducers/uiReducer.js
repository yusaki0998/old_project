/** @format */

import {
  ADD_NOTI,
  REMOVE_NOTI,
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
} from "../actions/types";

const initialState = {
  notiList: [],
  sidebar: {
    show: false,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_NOTI:
      return {
        ...state,
        notiList: [...state.notiList, payload],
      };
    case REMOVE_NOTI:
      return {
        ...state,
        notiList: state.notiList.filter((noti) => noti.id !== payload),
      };
    case SHOW_SIDEBAR:
      return {
        ...state,
        sidebar: {
          show: true,
        },
      };
    case HIDE_SIDEBAR:
      return {
        ...state,
        sidebar: {
          show: false,
        },
      };
    default:
      return state;
  }
};

export default reducer;
