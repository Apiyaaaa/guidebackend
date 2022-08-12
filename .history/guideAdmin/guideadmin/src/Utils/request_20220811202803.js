import axios from "axios";

import { BASE_URL, TIMEOUT } from "./config";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

api.interceptors.request.use(
  (config) => {
    console.log("请求拦截");
    return config;
  },
  (error) => {}
);

api.interceptors.request.use(
  (res) => {
    console.log("请求拦截");
    return config;
  },
  (error) => {}
);


export default