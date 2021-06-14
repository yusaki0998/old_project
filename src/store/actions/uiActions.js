import { ADD_NOTI, REMOVE_NOTI } from "./types";

export const addNotification = (payload) => ({
  type: ADD_NOTI,
  payload,
});

export const removeNotification = (payload) => ({
  type: REMOVE_NOTI,
  payload,
});
