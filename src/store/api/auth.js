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

export const verifyRegisterRequest = async (token) => {
  return axios.put(`/users/verify?token=${token}`);
};

export const getForgotPasswordTokenRequest = async (data) => {
  return axios.post(`/users/recover-password`, data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const resetPasswordRequest = async (token, data) => {
  return axios.patch(`/users/reset-password?token=${token}`, data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};
