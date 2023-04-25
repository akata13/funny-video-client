/* eslint-disable no-param-reassign */
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const app = process.env.REACT_APP_NAME;
    let token;
    if (localStorage.getItem(app)) {
      const redux = JSON.parse(localStorage.getItem(app));
      if (redux.auth && redux.auth.token) {
        token = redux.auth.token;
      }
    } else if (window.token) {
      token = window.token;
    }

    config.headers = {
      Accept: 'application/json'
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Return JSON data
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Attempt to get the actual error returned from API
    const err =
      (error.response && error.response.data && error.response.data) || error;

    return Promise.reject(err); // Propagate rejection back to caller
  }
);

export default instance;
