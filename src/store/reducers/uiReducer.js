import { ADD_NOTI, REMOVE_NOTI } from "../actions/types";

const initialState = {
  notiList: [],
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
    default:
      return state;
  }
};

export default reducer;
