import axios from "axios";

axios.de
const baseUrl = "http://localhost:80/";

const getArticleList = (word, page) => {
    return new Promise((resolve, reject)=>{
        axios({
            method: "GET",
            url: "api/api/article",
            params: { word: word, page: page },
          }).then((res) => {
            // console.log(res.data, "123");
            if (res.data) {
                landing(res.data)
                resolve(res.data)
            } else {
              console.log(res.code);
            }
          });
    })

};

export default getArticleList;
