import api from "./request.js"

export const getArticleList = () =>{
  return new Promise((resolve, reject) => {
    api.get('YOUR URL HERE', params)
          .then(res => {                    
              resolve() // Here you can use resolve as it passed as argument
          })
});
//   api.get('/api/article', {'word':'', 'page':1}).then((res)=>{
//     resolve(res.data) 
//   })
// }

