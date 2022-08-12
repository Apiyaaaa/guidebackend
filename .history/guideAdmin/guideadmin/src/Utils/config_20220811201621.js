import axios from "axios";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "http://test.mediastack.cn/";

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
  
