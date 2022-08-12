import axios from "axios";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "http://test.mediastack.cn/";

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
  
  作者：amiko爱学习
  链接：https://juejin.cn/post/6845166891464392717
  来源：稀土掘金
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。