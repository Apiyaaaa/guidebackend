import {myGET,myPOST} from "./request.js";


//---登陆---API
//注册用户
export function registerUser(data)  {
  return myPOST("api/login/register_user", data );

};
//登陆用户
export function loginUser(user_name,user_password)  {
  return myGET("api/login/login_user", {'user_name': user_name,'user_password':user_password} );

};
export function registerCheckUsername(word)  {
  return myGET("api/login/check_username", {'user_name':word} );

};



//---文章---管理页API
//获取文章内容
export function getArticleContent(article_id)  {
  return myGET("api/articles/get_article", {'article_id': article_id,'page': 1} );

};
//获取（搜索）文章列表By标题或者ID
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


//---标签---管理页API
//获取（搜索）标签列表,By名字或者ID
export function getTagByTitleAndId(word)  {
  return myGET("api/tags/get_tags", {'tag_id': word,'tag_name':word} );

};
//新建标签
export function createTag(data)  {
  return myPOST("api/tags/create_tag", data );

};
//修改标签
export function editTag(data)  {
  return myPOST("api/tags/edit_tag", data );

};
//删除标签
export function deleteTag(id,name)  {
  return myPOST("api/tags/delete_tag",  {'tag_id':id,'tag_name' : name} );

};


//---用户---管理页API
//新建用户
export function createUser(data)  {
  return myPOST("api/users/create_user", data );

};
//通过用户名和id获取用户列表
export function getUserByNameAndId(word)  {
  return myGET("api/users/get_users", {'uid': word,'user_name':word} );

};
//检查用户名是否唯一
export function checkUsername(word)  {
  return myGET("api/users/get_users", {'user_name':word} );

};
//编辑用户
export function editUser(data)  {
  return myPOST("api/users/edit_user", data );

};
//删除用户
export function deleteUser(uid,user_name)  {
  return myPOST("api/users/delete_user",  {'uid':uid,'user_name' : user_name});

};

