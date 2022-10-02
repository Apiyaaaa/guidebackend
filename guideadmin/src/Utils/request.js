import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config.js";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});
api.interceptors.request.use(
  (config) => {
    const url = config.url
    if (!url.includes('login') && !sessionStorage.getItem("loggedin")) {

      window.location = '/login'
      console.log(url)
    } else{
      return config
    }
  },
  (error) => { }
);

export function myGET(url, params = {}) {
  return new Promise((resolve, reject) => {
    console.log("myGET params:", params);
    api
      .get(url, {
        params: params,
      })
      //接口是否返回信息
      .then((response) => {
        console.log("myGET response: ", response)

        //是否返回有效信息
        if (landing(url, response.data)) {
          resolve(response);
        } else {
          reject(response);
        }

      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function myPOST(url, data = {}) {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));

  return new Promise((resolve, reject) => {
    console.log("myPOST data:", data);
    api
      .post(url, formData)
      .then(
        //接口是否返回信息
        (response) => {
          console.log('myPOST response', response);

          //是否返回有效信息
          if (landing(url, response.data)) {
            resolve(response);
          } else {
            reject(response)
          }
        },
        (err) => {
          reject(err);
        }
      );
  });
}

function landing(url, data) {
  const dataCode = parseInt(data.code);
  if (dataCode === 0) {
    console.log("没有有效数据", url)
    return false;
  } else if (dataCode === 1) {
    console.log("返回有效数据", url);
    return true;
  }
  else {
    console.log("数据返回异常", url, dataCode);
    return false;
  }
}

export default api;
