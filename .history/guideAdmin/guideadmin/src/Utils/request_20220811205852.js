import axios from "axios";

import { BASE_URL, TIMEOUT } from "./config.js";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

// api.interceptors.request.use(
//   (config) => {
//     console.log("请求拦截");
//     return config;
//   },
//   (error) => {}
// );

// api.interceptors.request.use(
//   (res) => {
//     console.log("请求拦截");
//     return res;
//   },
//   (error) => {}
// );


export function apiget(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
          params: params,
        }).then((response) => {
          landing(url, params, response.data);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  

export default api