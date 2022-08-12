import api from "./request.js"

export default  getArticleList = () =>{
  api.get('/api/api/article', {'word':'', 'page':1}).then((res)=>{
    console.log(res)
  })
}

