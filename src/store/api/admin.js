/** @format */

import axios from "./axios";

export const addAccountRequest = async (data) =>
  axios.post("/users/add-account", data, {
    headers: {
      "Content-type": "application/json",
    },
  });

export const getStaffListRequest = async () => axios.get("/users/get-staffs");

export const getManagerListRequest = async () =>
  axios.get("/users/get-managers");

export const deleteAccountRequest = async (uId) =>
  axios.delete(`/users/delete-account/${uId}`);

export const getAccountDetailRequest = async (uId, role) =>
  axios.get(`/users/get-${role}s/${uId}`);

export const updateAccountInfoRequest = async (uId, data) =>
  axios.put(`/users/edit-account/${uId}`, data, {
    headers: {
      "Content-type": "application/json",
    },
  });
export const getUserBySearchRequest = async () => axios.get("/users/search");
