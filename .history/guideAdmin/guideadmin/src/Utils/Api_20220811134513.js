import axios from "axios"


const baseUrl = "http://localhost:80"

const getArticleList = (word, page) => {
    axios(
        method:'GET',
        url:'api/api/article'
        
        
        
        {'word':word, 'page':page}).then((res)=>{
        console.log(baseUrl+'article')
        console.log(res,'123')
        if(res.code === 1) {
            return res.data
        } else {
            console.log(res.code)
        }
    })
}


export default getArticleList;