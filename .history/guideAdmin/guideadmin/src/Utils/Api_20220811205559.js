import api from "./request.js"

export const getArticleList = (word,page) =>{
  return new Promise((resolve, reject) => {
    api.get('api/article', {"word":word, "page":page})
          .then(res => {                    
              resolve(res) // Here you can use resolve as it passed as argument
          })
});
//   api.get('/api/article', {'word':'', 'page':1}).then((res)=>{
//     resolve(res.data) 
//   })
// }
}