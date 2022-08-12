import axios from 'axios';

axios.defaults.timeout = 50000;
axios.defaults.baseURL = "http://localhost:80/";

/**
 * http request 拦截器
 */
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
  
  /**
 * http response 拦截器
 */
axios.interceptors.response.use(
    (response) => {
      if (response.data.errCode === 2) {
        console.log("过期");
      }
      return response;
    },
    (error) => {
      console.log("请求出错：", error);
    }
  );
  
  作者：amiko爱学习
  链接：https://juejin.cn/post/6845166891464392717
  来源：稀土掘金
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。