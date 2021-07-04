/** @format */

import axios from "./axios";

export const getListCurrentFilmRequest = async () =>
  axios.get("/movies/ongoing");

export const createNewFilmRequest = async (formData) =>
  axios.post("/movies", formData, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });

export const getListComingFilmRequest = async () =>
  axios.get("/movies/comingsoon");

export const searchFilmRequest = async (input) =>
  axios.post(
    "/movies/search",
    {
      input,
    },
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
export const getFilmDetailRequest = async (filmId) =>
  axios.get(`/movies/${filmId}`);

export const updateFilmInfoRequest = async (filmId, formData) =>
  axios.put(`/movies/${filmId}`, formData, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });

export const deteleFilmRequest = async (filmId) =>
  axios.delete(`/movies/${filmId}`);

export const getListRoomRequest = async () => axios.get("/rooms");

export const createRoomRequest = async (data) =>
  axios.post("/rooms", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
export const getRoomDetailRequest = async (roomId) =>
  axios.get(`/rooms/${roomId}`);

export const getSeatDetailRequest = async (mapId) =>
  axios.get(`/seats/seat-maps/${mapId}`);

export const updateRoomInfoRequest = async (roomId, data) =>
  axios.put(`/rooms/${roomId}`, data, {
    headers: {
      "Content-type": "application/json",
    },
  });
export const deteleRoomRequest = async (roomId) =>
  axios.delete(`/rooms/${roomId}`);

export const getListSlotRequest = async () => axios.get("/slots");

export const createSlotRequest = async (data, isUpdate, slotId) => {
  if (isUpdate) {
    return axios.put(`/slots/${slotId}`, data, {
      headers: {
        "Content-type": "application/json",
      },
    });
  }
  return axios.post("/slots", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const deteleSlotRequest = async (slotId) =>
  axios.delete(`/slots/${slotId}`);

export const getSlotDetailRequest = async (slotId) =>
  axios.get(`/slots/${slotId}`);

export const updateSlotInfoRequest = async (slotId, data) =>
  axios.put(`/slots/${slotId}`, data, {
    headers: {
      "Content-type": "application/json",
    },
  });

export const getListSeatMapRequest = async () => axios.get("/seats/seat-maps");
