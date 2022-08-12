import axios from "axios";

const baseUrl = "http://localhost:80/";

const getArticleList = (word, page) => {
    const final = {}
  const response = axios({
    method: "GET",
    url: "api/api/article",
    params: { word: word, page: page },
  }).then((res) => {
    // console.log(res.data, "123");
    if (res.data) {
        final = res.data
        console
    } else {
      console.log(res.code);
    }
  });
  return final
};

export default getArticleList;
