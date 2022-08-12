import axios from "axios";

const baseUrl = "http://localhost:80/";

const getArticleList = (word, page) => {
  const response = await axios({
    method: "GET",
    url: "api/api/article",
    params: { word: word, page: page },
  }).then((res) => {
    console.log(res.data, "123");
    if (res.data) {
        console.log(res.data,'1231232123')
      return res.data;
    } else {
      console.log(res.code);
    }
  });
  console.log()
};

export default getArticleList;
