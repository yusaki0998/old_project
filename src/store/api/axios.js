import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV ? "http://localhost:5000" : "",
});

if (localStorage.getItem("customerAuthToken")) {
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("customerAuthToken")}`;
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
      window.location.href = "/login";
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
