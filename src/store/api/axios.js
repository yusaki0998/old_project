/** @format */

import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    // process.env.NODE_ENV === "development"
    //   ? "http://localhost:8080/api/v1/"
    //   :
    "https://ot-bm.herokuapp.com/api/v1/",
    
});

if (localStorage.getItem("customerAuthToken")) {
  axiosInstance.defaults.headers.common["token"] = `${localStorage.getItem(
    "customerAuthToken"
  )}`;
}

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("customerAuthToken");
      localStorage.removeItem("customerAuthData");
      if (!window.location.pathname.includes("/signin")) {
        window.location.href = "/signin";
      }
      axiosInstance.defaults.headers.common["token"] = "";
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
