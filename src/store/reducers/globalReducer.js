/** @format */

import {
  G_GET_LIST_CURRENT_FILM_START,
  G_GET_LIST_CURRENT_FILM_SUCCESS,
  G_GET_LIST_CURRENT_FILM_FAILED,
  G_GET_LIST_COMING_FILM_START,
  G_GET_LIST_COMING_FILM_SUCCESS,
  G_GET_LIST_COMING_FILM_FAILED,
} from "../actions/types";

const initialState = {
  currentFilm: {
    isLoading: false,
    list: [],
    error: null,
  },
  comingFilm: {
    isLoading: false,
    list: [],
    error: null,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case G_GET_LIST_CURRENT_FILM_START:
      return {
        ...state,
        currentFilm: {
          ...state.currentFilm,
          isLoading: true,
        },
      };
    case G_GET_LIST_CURRENT_FILM_SUCCESS:
      return {
        ...state,
        currentFilm: {
          ...state.currentFilm,
          isLoading: false,
          error: null,
          list: payload.data,
        },
      };
    case G_GET_LIST_CURRENT_FILM_FAILED:
      return {
        ...state,
        currentFilm: {
          ...state.currentFilm,
          isLoading: false,
          error: payload,
        },
      };
    case G_GET_LIST_COMING_FILM_START:
      return {
        ...state,
        comingFilm: {
          ...state.comingFilm,
          isLoading: true,
        },
      };
    case G_GET_LIST_COMING_FILM_SUCCESS:
      return {
        ...state,
        comingFilm: {
          ...state.comingFilm,
          isLoading: false,
          error: null,
          list: payload.data,
        },
      };
    case G_GET_LIST_COMING_FILM_FAILED:
      return {
        ...state,
        comingFilm: {
          ...state.comingFilm,
          isLoading: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
