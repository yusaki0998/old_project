/** @format */

import axios from "./axios";

export const getListCurrentFilmRequest = async () =>
  axios.get("/movies/ongoing");

export const getListComingFilmRequest = async () =>
  axios.get("/movies/comingsoon");

export const getFilmDetailRequest = async (movieId) =>
  axios.get("/movies/" + movieId);

export const getMovieScheduleRequest = async (movieId) =>
  axios.get(`/tickets/movies/${movieId}`);

export const getMovieSeatsRequest = async (scheduleId) =>
  axios.get(`/tickets/seats/${scheduleId}`);

export const bookTicketRequest = async (scheduleId, data) =>
  axios.post(
    `/tickets/${scheduleId}`,
    {
      seats: data,
    },
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
export const cancelBookingRequest = async (ticketId) =>
  axios.delete(`/tickets/${ticketId}`);
