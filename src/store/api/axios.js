import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pure-beyond-32158.herokuapp.com/api/v1/",
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
      localStorage.removeItem("customerAuthData");
      window.location.href = "/signin";
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
