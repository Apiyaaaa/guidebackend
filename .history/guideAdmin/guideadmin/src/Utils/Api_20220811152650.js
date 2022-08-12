function getArticleList(){
    return new Promise((resolve, reject) => {
      http("get",'/article/home/index').then(res => {
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
  
  作者：amiko爱学习
  链接：https://juejin.cn/post/6845166891464392717
  来源：稀土掘金
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。