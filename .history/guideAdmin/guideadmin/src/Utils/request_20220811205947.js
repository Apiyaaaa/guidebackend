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


export function get(url, params = {}) {
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
  
  作者：amiko爱学习
  链接：https://juejin.cn/post/6845166891464392717
  来源：稀土掘金
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
  

export default api