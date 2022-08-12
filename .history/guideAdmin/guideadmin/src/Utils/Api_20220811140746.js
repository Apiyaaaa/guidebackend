import axios from "axios"


const baseUrl = "http://localhost:80/"

const getArticleList = (word, page) => {
    axios({
        method: "GET",
        url: "api/api/article",
        params:{'word':word, 'page':page}
    }
        ).then((res)=>{
        if(res.data) {
            return res.data
        } else {
            console.log(res.code)
        }
    })
}


export default getArticleList;