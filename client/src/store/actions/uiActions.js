/** @format */

import { ADD_NOTI, HIDE_SIDEBAR, REMOVE_NOTI, SHOW_SIDEBAR } from "./types";

export const addNotification = (payload) => ({
  type: ADD_NOTI,
  payload,
});

export const removeNotification = (payload) => ({
  type: REMOVE_NOTI,
  payload,
});

export const showSidebar = () => ({
  type: SHOW_SIDEBAR,
});

export const hideSidebar = () => ({
  type: HIDE_SIDEBAR,
});
