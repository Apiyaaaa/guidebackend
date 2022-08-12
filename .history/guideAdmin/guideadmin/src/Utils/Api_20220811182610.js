import axios from 'axios';

axios.defaults.timeout = 50000;
axios.defaults.baseURL = "http://localhost:80/";

/**
 * http request 拦截器
 */
 axios.interceptors.request.use(
    (config) => {
      config.data = JSON.stringify(config.data);
      config.headers = {
        "Content-Type": "application/json",
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  