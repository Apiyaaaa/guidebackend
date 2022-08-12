import axios from "axios"


const baseUrl = "https://localhost:80"

const getArticleList = (word, page) => {
    axios.get(baseUrl+'article', {'word':word, 'page':page}).then((res)=>{
        console.log(baseUrl+)
        if(res.code === 1) {
            return res.data
        } else {
            console.log(res.code)
        }
    })
}


export default getArticleList;