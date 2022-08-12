import api from "./request.js";

export function getArticleList(word, page) => {
  return new Promise((resolve, reject) => {
    api.get("api/article", { 'word': word, 'page': page }).then((res) => {
      resolve(res);
      console.log(111)
    });
  });
};
