import axios from "axios";

const baseUrl = "http://localhost:80/";

const getArticleList = (word, page) => {
    return new Promise((resolve, reject))
  const response = axios({
    method: "GET",
    url: "api/api/article",
    params: { word: word, page: page },
  }).then((res) => {
    // console.log(res.data, "123");
    if (res.data) {
        const final = res.data
        console.log(final)
    } else {
      console.log(res.code);
    }
  });
  return response
};

export default getArticleList;
