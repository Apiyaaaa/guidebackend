# This Python file uses the following encoding: utf-8
from model import Article
from config import db
from flask import jsonify
from utils.utils import query2dict, dataReturn
import os
import datetime


def getArticle(article_id=None, title=None):
    if article_id == None and title == None:
        results = Article.query.all()
    else:
        results = Article.query.filter_by(article_id=article_id).first()
        if results.title != title:
            msg = f"文章id与标题不匹配"
        if len(results) == 0:
            msg = f"文章 {article_id}:{title} 不存在"
        return dataReturn(msg=msg)
    if len(results) > 0:
        queryCount = len(results)
        data = query2dict(results)
        return dataReturn(f'成功搜索到{queryCount}篇文章', data=data)
    else:
        msg = f"没有搜索到相关文章"
        return dataReturn(msg=msg)


def createArticle(title, summary, body, tags, uid, country, is_publish):
    tags = tags.
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


def editArticle(article_id, title, summary, body, tags, uid, country, is_publish):
    results = Article.query.filter_by(article_id=article_id).first()
    if results is not None:
        results.title = title
        results.summary = summary
        results.body = body
        results.tags = tags
        results.uid = uid
        results.country = country
        results.is_publish = is_publish
        db.session.commit()
        msg = "文章修改成功"
    else:
        msg = f'标签 {article_id}: {title} 不存在'
    return dataReturn(msg=msg)

def uploadimg(imgdata):
    basedir = os.path.abspath(os.path.dirname(__file__)) +'\\static\\upload\\img'
    if not os.path.exists(basedir):
        os.makedirs(basedir)
    imgName = imgdata.filename
    time = datetime.now()
    timeStr = str(time.strftime("%Y%m%d%H%M%S"))
    finalName = timeStr + imgName
    url = 'http://localhost:80/static/upload/img/' + finalName
    imgdata.save(os.path.join(basedir, finalName))
    msg = f'图片上传成功'
    data = {'url': str(url)}
    return dataReturn(msg=msg, data=data)