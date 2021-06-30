/** @format */

import axios from "./axios";

export const getUserGeneralInfoRequest = async () => {
  return axios.get("/users/profile");
};

export const updateUserGeneralInfoRequest = async (data) => {
  return axios.put("/users/update-profile", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const updateUserPasswordRequest = async (data) => {
  return axios.patch("/users/change-password", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};
