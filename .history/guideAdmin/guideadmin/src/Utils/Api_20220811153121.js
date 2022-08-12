function getArticleList(){
    return new Promise((resolve, reject) => {
      http("get",'/api/home/index').then(res => {
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
  