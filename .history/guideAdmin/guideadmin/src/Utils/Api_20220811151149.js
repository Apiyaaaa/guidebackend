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
  
  作者：amiko爱学习
  链接：https://juejin.cn/post/6845166891464392717
  来源：稀土掘金
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


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
  