/** @format */

import axios from "./axios";

export const getListCurrentFilmRequest = async () =>
  axios.get("/movies/ongoing");

export const getListComingFilmRequest = async () =>
  axios.get("/movies/comingsoon");

export const getFilmDetailRequest = async (movieId) =>
  axios.get("/movies/" + movieId);
