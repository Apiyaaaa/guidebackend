import api from "./request.js";

export const getArticleList = (word, page) => {
  return new Promise((resolve, reject) => {
    api.get("api/article", { word: word, page: page }).then((res) => {
      console.log('api',res)
      resolve(res.data);
    });
  });
};
