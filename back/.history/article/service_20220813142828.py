# This Python file uses the following encoding: utf-8
from model import Article
from config import db
from flask import jsonify
from utils.utils import query2dict, dataReturn

def getArticle(article_id=None, title=None):

    results = Article.query.filter_by(article_id=article_id).first()
    if results.title != title:
        msg = f"文章id"
    elif title != None:
        results = Tag.query.filter_by(tag_name=title).first()
    else:
        msg = f"文章 {article_id}{title} 不存在"
        return dataReturn(msg=msg)
    if len(results)>0:
        queryCount = len(results)
        data = query2dict(results)
        return dataReturn(f'成功搜索到{queryCount}个标签，搜索条件{tag_id}/{tag_name}',data=data)
    



def createArticle(tag_name, tag_discription):
    results = Tag.query.filter_by(tag_name=tag_name).first()
    if results is None:
        tag = Tag(tag_name=tag_name, tag_discription=tag_discription)
        db.session.add(tag)
        db.session.commit()
        msg = f"标签 {tag_name} 创建成功"
    else:
        msg = f'标签已存在'
    return dataReturn(msg=msg)

def deleteArticle(tag_name, tag_id):
    results = Tag.query.filter_by(tag_name=tag_name).first()
    if results:
        print(results.tag_id,tag_id)
        if int(results.tag_id) != int(tag_id):
            return (f"标签与ID不匹配")
        db.session.delete(results)
        db.session.commit()
        msg = f"成功删除标签 {tag_name}"
    else:
        msg = f"标签 {tag_name} 不存在"
    return dataReturn(msg=msg)
    

def editArticle(tag_id, tag_discription, tag_name, tag_alias=''):
    results = Tag.query.filter_by(tag_id=tag_id).first()
    if results is not None:
        results.tag_name = tag_name
        results.tag_discription = tag_discription
        results.tag_alias = tag_alias
        
        db.session.commit()
        msg = "标签修改成功"
    else:
        msg = f'标签 {tag_id} 不存在'
    return dataReturn(msg=msg)


