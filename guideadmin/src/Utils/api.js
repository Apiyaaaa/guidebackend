import api, {myGET,myPOST} from "./request.js";


//获取文章，标题匹配
export function getArticleList(word, page)  {
  return myGET("api/search", {'word': word, 'page': page} );

};

//后台 - 文章管理页API
//获取文章内容
export function getArticleContent(article_id)  {
  return myGET("api/articles/get_article", {'article_id': article_id,'page': 1} );

};
//搜索文章By标题或者ID
export function searchByTitleAndId(word,page)  {
  return myGET("api/articles/get_article", {'article_id': word,'title':word,'page': page} );

};
//删除文章
export function deleteArticle(article_id,title)  {
  return myPOST("api/articles/delete_article", {'article_id': article_id,'title':title} );

};
//新建文章
export function createArticle(data)  {
  return myPOST("api/articles/create_article", data );

};
//编辑文章
export function editArticle(data)  {
  return myPOST("api/articles/edit_article", data );

};
