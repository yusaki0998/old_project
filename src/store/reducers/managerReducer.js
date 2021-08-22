/** @format */

import {
  GET_LIST_CURRENT_FILM_START,
  GET_LIST_CURRENT_FILM_SUCCESS,
  GET_LIST_CURRENT_FILM_FAILED,
  CREATE_NEW_FILM_START,
  CREATE_NEW_FILM_SUCCESS,
  CREATE_NEW_FILM_FAILED,
  RESET_CREATE_FILM_STATE,
  GET_LIST_COMING_FILM_START,
  GET_LIST_COMING_FILM_SUCCESS,
  GET_LIST_COMING_FILM_FAILED,
  UPDATE_FILM_INFO_START,
  UPDATE_FILM_INFO_SUCCESS,
  UPDATE_FILM_INFO_FAILED,
  REMOVE_FILM_FROM_STATE,
  GET_LIST_ROOM_START,
  GET_LIST_ROOM_SUCCESS,
  GET_LIST_ROOM_FAILED,
  CREATE_ROOM_START,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILED,
  RESET_CREATE_ROOM_STATE,
  UPDATE_ROOM_INFO_START,
  UPDATE_ROOM_INFO_SUCCESS,
  UPDATE_ROOM_INFO_FAILED,
  REMOVE_ROOM_FROM_STATE,
  GET_LIST_SLOT_START,
  GET_LIST_SLOT_SUCCESS,
  GET_LIST_SLOT_FAILED,
  CREATE_SLOT_START,
  CREATE_SLOT_SUCCESS,
  CREATE_SLOT_FAILED,
  RESET_CREATE_SLOT_STATE,
  UPDATE_SLOT_INFO_START,
  UPDATE_SLOT_INFO_SUCCESS,
  UPDATE_SLOT_INFO_FAILED,
  REMOVE_SLOT_FROM_STATE,
} from "../actions/types";

const initialState = {
  currentFilm: {
    isLoading: false,
    list: [],
    error: null,
  },
  createFilm: {
    isLoading: false,
    success: false,
    error: null,
    data: {},
  },
  comingFilm: {
    isLoading: false,
    list: [],
    error: null,
  },
  updateFilm: {
    isLoading: false,
  },
  room: {
    isLoading: false,
    list: [],
    error: null,
  },
  createRoom: {
    isLoading: false,
    success: false,
    error: null,
    data: {},
  },
  updateRoom: {
    isLoading: false,
  },
  slot: {
    isLoading: false,
    list: [],
    error: null,
  },
  createSlot: {
    isLoading: false,
    success: false,
    error: null,
    data: {},
  },
  updateSlot: {
    isLoading: false,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LIST_CURRENT_FILM_START:
      return {
        ...state,
        currentFilm: {
          ...state.currentFilm,
          isLoading: true,
        },
      };
    case GET_LIST_CURRENT_FILM_SUCCESS:
      return {
        ...state,
        currentFilm: {
          ...state.currentFilm,
          isLoading: false,
          error: null,
          list: payload.data,
        },
      };
    case GET_LIST_CURRENT_FILM_FAILED:
      return {
        ...state,
        currentFilm: {
          ...state.currentFilm,
          isLoading: false,
          error: payload,
        },
      };
    case CREATE_NEW_FILM_START:
      return {
        ...state,
        createFilm: {
          ...state.createFilm,
          isLoading: true,
          data: {},
        },
      };
    case CREATE_NEW_FILM_SUCCESS:
      return {
        ...state,
        createFilm: {
          ...state.createFilm,
          isLoading: false,
          error: null,
          data: payload,
          success: true,
        },
      };
    case CREATE_NEW_FILM_FAILED:
      return {
        ...state,
        createFilm: {
          ...state.createFilm,
          isLoading: false,
          error: payload,
          success: false,
          data: {},
        },
      };
    case RESET_CREATE_FILM_STATE:
      return {
        ...state,
        createFilm: {
          isLoading: false,
          error: null,
          success: false,
          data: {},
        },
      };
    case GET_LIST_COMING_FILM_START:
      return {
        ...state,
        comingFilm: {
          ...state.comingFilm,
          isLoading: true,
        },
      };
    case GET_LIST_COMING_FILM_SUCCESS:
      return {
        ...state,
        comingFilm: {
          ...state.comingFilm,
          isLoading: false,
          error: null,
          list: payload.data,
        },
      };
    case GET_LIST_COMING_FILM_FAILED:
      return {
        ...state,
        comingFilm: {
          ...state.comingFilm,
          isLoading: false,
          error: payload,
        },
      };
    case UPDATE_FILM_INFO_START:
      return {
        ...state,
        updateFilm: {
          isLoading: true,
        },
      };
    case UPDATE_FILM_INFO_SUCCESS:
    case UPDATE_FILM_INFO_FAILED:
      return {
        ...state,
        updateFilm: {
          isLoading: false,
        },
      };
    case REMOVE_FILM_FROM_STATE:
      if (payload.from === "current") {
        return {
          ...state,
          currentFilm: {
            ...state.currentFilm,
            list: state.currentFilm.list.filter(
              (item) => item._id !== payload.filmId
            ),
          },
        };
      }
      if (payload.from === "coming") {
        return {
          ...state,
          comingFilm: {
            ...state.comingFilm,
            list: state.comingFilm.list.filter(
              (item) => item._id !== payload.filmId
            ),
          },
        };
      }
      return state;
    case GET_LIST_ROOM_START:
      return {
        ...state,
        room: {
          ...state.room,
          isLoading: true,
        },
      };
    case GET_LIST_ROOM_SUCCESS:
      return {
        ...state,
        room: {
          ...state.room,
          isLoading: false,
          error: null,
          list: payload.data,
        },
      };
    case GET_LIST_ROOM_FAILED:
      return {
        ...state,
        room: {
          ...state.room,
          isLoading: false,
          error: payload,
        },
      };
    case CREATE_ROOM_START:
      return {
        ...state,
        createRoom: {
          ...state.createRoom,
          isLoading: true,
          data: {},
        },
      };
    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        createRoom: {
          ...state.createRoom,
          isLoading: false,
          error: null,
          data: payload,
          success: true,
        },
      };
    case CREATE_ROOM_FAILED:
      return {
        ...state,
        createRoom: {
          ...state.createRoom,
          isLoading: false,
          error: payload,
          success: false,
          data: {},
        },
      };
    case RESET_CREATE_ROOM_STATE:
      return {
        ...state,
        createRoom: {
          isLoading: false,
          error: null,
          success: false,
          data: {},
        },
      };
    case UPDATE_ROOM_INFO_START:
      return {
        ...state,
        updateRoom: {
          isLoading: true,
        },
      };
    case UPDATE_ROOM_INFO_SUCCESS:
    case UPDATE_ROOM_INFO_FAILED:
      return {
        ...state,
        updateRoom: {
          isLoading: false,
        },
      };
    case REMOVE_ROOM_FROM_STATE:
      return {
        ...state,
        room: {
          ...state.room,
          list: state.room.list.filter((item) => item._id !== payload),
        },
      };
    case GET_LIST_SLOT_START:
      return {
        ...state,
        slot: {
          ...state.slot,
          isLoading: true,
        },
      };
    case GET_LIST_SLOT_SUCCESS:
      return {
        ...state,
        slot: {
          ...state.slot,
          isLoading: false,
          error: null,
          list: payload.data,
        },
      };
    case GET_LIST_SLOT_FAILED:
      return {
        ...state,
        slot: {
          ...state.slot,
          isLoading: false,
          error: payload,
        },
      };
    case CREATE_SLOT_START:
      return {
        ...state,
        createSlot: {
          ...state.createSlot,
          isLoading: true,
          data: {},
        },
      };
    case CREATE_SLOT_SUCCESS:
      return {
        ...state,
        createSlot: {
          ...state.createSlot,
          isLoading: false,
          error: null,
          data: payload.data,
          success: true,
        },
        slot: {
          ...state.slot,
          list: payload.isUpdate
            ? state.slot.list.map((item) =>
                item._id === payload.slotId ? payload.data : item
              )
            : [...state.slot.list, payload.data],
        },
      };
    case CREATE_SLOT_FAILED:
      return {
        ...state,
        createSlot: {
          ...state.createSlot,
          isLoading: false,
          error: payload,
          success: false,
          data: {},
        },
      };
    case RESET_CREATE_SLOT_STATE:
      return {
        ...state,
        createSlot: {
          isLoading: false,
          error: null,
          success: false,
          data: {},
        },
      };
    case UPDATE_SLOT_INFO_START:
      return {
        ...state,
        updateSlot: {
          isLoading: true,
        },
      };
    case UPDATE_SLOT_INFO_SUCCESS:
    case UPDATE_SLOT_INFO_FAILED:
      return {
        ...state,
        updateSlot: {
          isLoading: false,
        },
      };
    case REMOVE_SLOT_FROM_STATE:
      return {
        ...state,
        slot: {
          ...state.slot,
          list: state.slot.list.filter((item) => item._id !== payload),
        },
      };
    default:
      return state;
  }
};

export default reducer;
