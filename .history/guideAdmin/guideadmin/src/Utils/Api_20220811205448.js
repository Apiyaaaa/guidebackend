import api from "./request.js"

export const getArticleList = () =>{
  return return new Promise((resolve, reject) => {
    axios.post('YOUR URL HERE', params)
          .then(response => {                    
              resolve() // Here you can use resolve as it passed as argument
          })
});
  api.get('/api/article', {'word':'', 'page':1}).then((res)=>{
    resolve(res.data) 
  })
}

