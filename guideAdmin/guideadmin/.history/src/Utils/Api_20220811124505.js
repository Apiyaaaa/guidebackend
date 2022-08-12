import axios from "axios"

const baseUrl = "https://localhost:80"

const getArticleList = (page) => {
    axios.get(baseUrl+'article', {'word':}).then((res)=>{
        if(res.code === 1) {
            return res.data
        } else {
            console.log(res.code)
        }
    })
}