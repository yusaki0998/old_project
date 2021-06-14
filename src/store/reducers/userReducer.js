import {
  EDIT_USER_PROFILE_FAILED,
  EDIT_USER_PROFILE_SUCCESS,
  EDIT_USER_PROFILE_START,
} from "../actions/types";

const initialState = {
  isLoading: false,
  error: null,
  success: false,
  data: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case EDIT_USER_PROFILE_START:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: true,
        data: payload,
      };
    case EDIT_USER_PROFILE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };
    default:
      return state;
  }
};

export default reducer;
