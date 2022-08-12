import axios from "axios"


function getArticleList(){
  return new Promise((resolve, reject) => {
    axios("get",'/article/home/index').then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}

export {
   getArticleList
}