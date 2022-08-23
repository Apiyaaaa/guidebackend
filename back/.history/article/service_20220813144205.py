# This Python file uses the following encoding: utf-8
from model import Article
from config import db
from flask import jsonify
from utils.utils import query2dict, dataReturn


def getArticle(article_id=None, title=None):
    if article_id == None:
        msg = '请传入article_id'
        return dataReturn(msg=msg)
    results = Article.query.filter_by(article_id=article_id).first()
    if results.title != title:
        msg = f"文章id与标题不匹配"
    if len(results) == 0:
        msg = f"文章 {article_id}:{title} 不存在"
        return dataReturn(msg=msg)
    if len(results) > 0:
        queryCount = len(results)
        data = query2dict(results)
        return dataReturn(f'成功搜索到{queryCount}篇文章，搜索条件{tag_id}/{tag_name}', data=data)


def createArticle(title, summary, body, tags, uid, country, is_publish):
    article = Article(title=title, summary=summary, body=body, tags=tags,
                      uid=uid, country=country, is_publish=is_publish, views=0)
    db.session.add(article)
    db.session.commit()
    msg = f"文章 {title} 创建成功"
    return dataReturn(msg=msg)


def deleteArticle(article_id, title):
    results = Article.query.filter_by(article_id=article_id).first()
    if results:
        if results.title != title:
            msg = (f"标题与ID不匹配")
            return dataReturn(msg=msg)
        db.session.delete(results)
        db.session.commit()
        msg = f"成功删除文章 {article_id}: {title}"
    else:
        msg = f"文章 {article_id} 不存在"
    return dataReturn(msg=msg)


def editArticle(aricle_id, title, summary, body, tags, uid, country, is_publish):
    results = Article.query.filter_by(aricle_id=aricle_id).first()
    if results is not None:
        results.title = title
        results.summary = summary
        results.body = tag_alias

        db.session.commit()
        msg = "标签修改成功"
    else:
        msg = f'标签 {tag_id} 不存在'
    return dataReturn(msg=msg)
