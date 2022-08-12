import api from "./request.js"

const getArticleList = () =>{
  api.get('/api/api/article', {'word':'', 'page':1}).then
}