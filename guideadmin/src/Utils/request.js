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

export function myGET(url, params = {}) {
  return new Promise((resolve, reject) => {
    console.log("myGET params:",params);
    api
      .get(url, {
        params: params,
      })
      .then((response) => {
        console.log("myGET response: ",response)
        landing(url, params, response.data);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function myPOST(url, data ={}) {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));

  return new Promise((resolve, reject) => {
    console.log("myPOST data:",formData);

    api
    .post(url, formData)
    .then(
      (response) => {
        console.log('myPOST response',response);
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

function landing(url, params, data) {
  const dataCode = parseInt(data.code);
  if (dataCode === 0) {
    console.log("数据返回失败",url)
  } else if(dataCode === 1){
    console.log("数据返回成功",url)
  }
  else{
    console.log("数据返回异常",url,dataCode)
  }
}

export default api;
