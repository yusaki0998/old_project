/** @format */

import {
  G_GET_LIST_COMING_FILM,
  G_GET_LIST_COMING_FILM_FAILED,
  G_GET_LIST_COMING_FILM_START,
  G_GET_LIST_COMING_FILM_SUCCESS,
  G_GET_LIST_CURRENT_FILM,
  G_GET_LIST_CURRENT_FILM_FAILED,
  G_GET_LIST_CURRENT_FILM_START,
  G_GET_LIST_CURRENT_FILM_SUCCESS,
} from "./types";

export const globalGetListCurrentFilm = () => ({
  type: G_GET_LIST_CURRENT_FILM,
});

export const globalGetListCurrentFilmStart = () => ({
  type: G_GET_LIST_CURRENT_FILM_START,
});

export const globalGetListCurrentFilmSuccess = (payload) => ({
  type: G_GET_LIST_CURRENT_FILM_SUCCESS,
  payload,
});

export const globalGetListCurrentFilmFailed = (payload) => ({
  type: G_GET_LIST_CURRENT_FILM_FAILED,
  payload,
});

export const globalGetListComingFilm = () => ({
  type: G_GET_LIST_COMING_FILM,
});

export const globalGetListComingFilmStart = () => ({
  type: G_GET_LIST_COMING_FILM_START,
});

export const globalGetListComingFilmSuccess = (payload) => ({
  type: G_GET_LIST_COMING_FILM_SUCCESS,
  payload,
});

export const globalGetListComingFilmFailed = (payload) => ({
  type: G_GET_LIST_COMING_FILM_FAILED,
  payload,
});
