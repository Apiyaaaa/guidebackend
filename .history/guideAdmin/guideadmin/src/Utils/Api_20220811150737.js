import axios from "axios";

axios.defaults.timeout = 10000;
axios.defaults.baseURL = "http://localhost:80/";


axios.interceptors.request.use(
    (config) =>
)

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: "api/api/article",
      params: { word: word, page: page },
    }).then((res) => {
      landing(res.data);
      resolve(res.data);
    })
    .catch((error) => {
        reject(error);
    })
  });
}

