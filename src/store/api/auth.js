/** @format */

import axios from "./axios";

export const signupRequest = async (data) => {
  return axios.post("/users/register", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const loginRequest = async (data) => {
  return axios.post("/users/login", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};
