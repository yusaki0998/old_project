/** @format */

import {
  GET_LIST_CURRENT_FILM,
  GET_LIST_CURRENT_FILM_START,
  GET_LIST_CURRENT_FILM_SUCCESS,
  GET_LIST_CURRENT_FILM_FAILED,
  CREATE_NEW_FILM,
  CREATE_NEW_FILM_START,
  CREATE_NEW_FILM_SUCCESS,
  CREATE_NEW_FILM_FAILED,
  RESET_CREATE_FILM_STATE,
  GET_LIST_COMING_FILM,
  GET_LIST_COMING_FILM_START,
  GET_LIST_COMING_FILM_SUCCESS,
  GET_LIST_COMING_FILM_FAILED,
  UPDATE_FILM_INFO,
  UPDATE_FILM_INFO_START,
  UPDATE_FILM_INFO_SUCCESS,
  UPDATE_FILM_INFO_FAILED,
  REMOVE_FILM_FROM_STATE,
  GET_LIST_ROOM,
  GET_LIST_ROOM_START,
  GET_LIST_ROOM_SUCCESS,
  GET_LIST_ROOM_FAILED,
  CREATE_ROOM,
  CREATE_ROOM_START,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILED,
  RESET_CREATE_ROOM_STATE,
  UPDATE_ROOM_INFO,
  UPDATE_ROOM_INFO_START,
  UPDATE_ROOM_INFO_SUCCESS,
  UPDATE_ROOM_INFO_FAILED,
  REMOVE_ROOM_FROM_STATE,
  GET_LIST_SLOT,
  GET_LIST_SLOT_START,
  GET_LIST_SLOT_SUCCESS,
  GET_LIST_SLOT_FAILED,
  REMOVE_SLOT_FROM_STATE,
  CREATE_SLOT,
  CREATE_SLOT_START,
  CREATE_SLOT_SUCCESS,
  CREATE_SLOT_FAILED,
  RESET_CREATE_SLOT_STATE,
  UPDATE_SLOT_INFO,
  UPDATE_SLOT_INFO_START,
  UPDATE_SLOT_INFO_SUCCESS,
  UPDATE_SLOT_INFO_FAILED,
  RESET_UPATE_FILM_INFO_STATE,
} from "./types";

export const getListCurrentFilm = () => ({
  type: GET_LIST_CURRENT_FILM,
});

export const getListCurrentFilmStart = () => ({
  type: GET_LIST_CURRENT_FILM_START,
});

export const getListCurrentFilmSuccess = (payload) => ({
  type: GET_LIST_CURRENT_FILM_SUCCESS,
  payload,
});

export const getListCurrentFilmFailed = (payload) => ({
  type: GET_LIST_CURRENT_FILM_FAILED,
  payload,
});

export const createNewFilm = (data) => ({
  type: CREATE_NEW_FILM,
  data,
});

export const createNewFilmStart = () => ({
  type: CREATE_NEW_FILM_START,
});

export const createNewFilmSuccess = (payload) => ({
  type: CREATE_NEW_FILM_SUCCESS,
  payload,
});

export const createNewFilmFailed = (payload) => ({
  type: CREATE_NEW_FILM_FAILED,
  payload,
});

export const resetCreateNewFilmState = () => ({
  type: RESET_CREATE_FILM_STATE,
});

export const resetUpdateFilmInfoState = () => ({
  type: RESET_UPATE_FILM_INFO_STATE,
});

export const getListComingFilm = () => ({
  type: GET_LIST_COMING_FILM,
});

export const getListComingFilmStart = () => ({
  type: GET_LIST_COMING_FILM_START,
});

export const getListComingFilmSuccess = (payload) => ({
  type: GET_LIST_COMING_FILM_SUCCESS,
  payload,
});

export const getListComingFilmFailed = (payload) => ({
  type: GET_LIST_COMING_FILM_FAILED,
  payload,
});

export const updateFilmInfo = (filmId, data) => ({
  type: UPDATE_FILM_INFO,
  filmId,
  data,
});

export const updateFilmInfoStart = () => ({
  type: UPDATE_FILM_INFO_START,
});

export const updateFilmInfoSuccess = (payload) => ({
  type: UPDATE_FILM_INFO_SUCCESS,
  payload,
});

export const updateFilmInfoFailed = (payload) => ({
  type: UPDATE_FILM_INFO_FAILED,
  payload,
});

export const removeFilmFromState = (filmId, from) => ({
  type: REMOVE_FILM_FROM_STATE,
  payload: { filmId, from },
});

export const getListRoom = () => ({
  type: GET_LIST_ROOM,
});

export const getListRoomStart = () => ({
  type: GET_LIST_ROOM_START,
});

export const getListRoomSuccess = (payload) => ({
  type: GET_LIST_ROOM_SUCCESS,
  payload,
});

export const getListRoomFailed = (payload) => ({
  type: GET_LIST_ROOM_FAILED,
  payload,
});

export const removeRoomFromState = (payload) => ({
  type: REMOVE_ROOM_FROM_STATE,
  payload,
});

export const createRoom = (data) => ({
  type: CREATE_ROOM,
  data,
});

export const createRoomStart = () => ({
  type: CREATE_ROOM_START,
});

export const createRoomSuccess = (payload) => ({
  type: CREATE_ROOM_SUCCESS,
  payload,
});

export const createRoomFailed = (payload) => ({
  type: CREATE_ROOM_FAILED,
  payload,
});

export const resetCreateRoomState = () => ({
  type: RESET_CREATE_ROOM_STATE,
});

export const updateRoomInfo = (roomId, data) => ({
  type: UPDATE_ROOM_INFO,
  roomId,
  data,
});

export const updateRoomInfoStart = () => ({
  type: UPDATE_ROOM_INFO_START,
});

export const updateRoomInfoSuccess = (payload) => ({
  type: UPDATE_ROOM_INFO_SUCCESS,
  payload,
});

export const updateRoomInfoFailed = (payload) => ({
  type: UPDATE_ROOM_INFO_FAILED,
  payload,
});

export const getListSlot = () => ({
  type: GET_LIST_SLOT,
});

export const getListSlotStart = () => ({
  type: GET_LIST_SLOT_START,
});

export const getListSlotSuccess = (payload) => ({
  type: GET_LIST_SLOT_SUCCESS,
  payload,
});

export const getListSlotFailed = (payload) => ({
  type: GET_LIST_SLOT_FAILED,
  payload,
});

export const removeSlotFromState = (payload) => ({
  type: REMOVE_SLOT_FROM_STATE,
  payload,
});

export const createSlot = (data) => ({
  type: CREATE_SLOT,
  data,
});

export const createSlotStart = () => ({
  type: CREATE_SLOT_START,
});

export const createSlotSuccess = (payload) => ({
  type: CREATE_SLOT_SUCCESS,
  payload,
});

export const createSlotFailed = (payload) => ({
  type: CREATE_SLOT_FAILED,
  payload,
});

export const resetCreateSlotState = () => ({
  type: RESET_CREATE_SLOT_STATE,
});

export const updateSlotInfo = (slotId, data) => ({
  type: UPDATE_SLOT_INFO,
  slotId,
  data,
});

export const updateSlotInfoStart = () => ({
  type: UPDATE_SLOT_INFO_START,
});

export const updateSlotInfoSuccess = (payload) => ({
  type: UPDATE_SLOT_INFO_SUCCESS,
  payload,
});

export const updateSlotInfoFailed = (payload) => ({
  type: UPDATE_SLOT_INFO_FAILED,
  payload,
});
