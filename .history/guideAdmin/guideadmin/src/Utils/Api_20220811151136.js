// index.ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

class Request {
  // axios 实例
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }
  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }
}

export default Request


export default function (fecth, url, param) {
    let _data = "";
    return new Promise((resolve, reject) => {
      switch (fecth) {
        case "get":
          console.log("begin a get request,and url:", url);
          get(url, param)
            .then(function (response) {
              resolve(response);
            })
            .catch(function (error) {
              console.log("get request GET failed.", error);
              reject(error);
            });
          break;
        case "post":
          post(url, param)
            .then(function (response) {
              resolve(response);
            })
            .catch(function (error) {
              console.log("get request POST failed.", error);
              reject(error);
            });
          break;
        default:
          break;
      }
    });
  }
  