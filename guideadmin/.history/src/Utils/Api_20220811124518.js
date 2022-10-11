import axios from "axios"

const baseUrl = "https://localhost:80"

const getArticleList = (word, page) => {
    axios.get(baseUrl+'article', {'word':word, 'page':page}).then((res)=>{
        if(res.code === 1) {
            return res.data
        } else {
            console.log(res.code)
        }
    })
}