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
  
  作者：amiko爱学习
  链接：https://juejin.cn/post/6845166891464392717
  来源：稀土掘金
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。