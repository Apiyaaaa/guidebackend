import axios from "axios";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "http://test.mediastack.cn/";

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
  
  /**
   * 封装post请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  
  export function post(url, data) {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then(
        (response) => {
          //关闭进度条
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  


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
  