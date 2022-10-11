# This Python file uses the following encoding: utf-8
from model import Article
from config import db
from flask import jsonify
from utils.utils import query2dict, dataReturn
import os
from datetime import datetime
import tag.service as tag


def getArticle(article_id=None, title=None, page=1):

    if not article_id and not title:
        results = Article.query.paginate(
            page=int(page), per_page=20, error_out=False).items
        if len(results) == 0:
            msg = f"数据库无文章"
            return dataReturn(msg=msg,code = 0)
        else:
            queryCount = len(results)
            data = query2dict(results)
            return dataReturn(f'成功搜索到{queryCount}篇文章', data=data)

    elif article_id and title == None:
        results = Article.query.filter_by(article_id=article_id).paginate(
            page=int(page), per_page=20, error_out=False).items
        if len(results) == 0:
            msg = f"ID为 {article_id} 的文章不存在"

            return dataReturn(msg=msg, code=0)
        else:
            queryCount = len(results)
            data = query2dict(results)
            return dataReturn(f'成功搜索到{queryCount}篇文章', data=data)

    elif title and article_id == None:
        results = Article.query.filter(
            Article.title.like("%" + str(title) + "%")).paginate(page=int(page), per_page=20, error_out=False).items
        if len(results) > 0:
            queryCount = len(results)
            data = query2dict(results)
            return dataReturn(f'成功搜索到{queryCount}篇文章', data=data)
        else:
            msg = f"没有搜索到相关文章"
            return dataReturn(msg=msg, code=0)

    # 后台文章搜索
    elif title and article_id:
        results = Article.query.filter(
            Article.title.like("%" + str(title) + "%") |
            Article.article_id.like("%" + str(article_id) + "%")).paginate(page=int(page), per_page=20, error_out=False).items
        if len(results) > 0:
            queryCount = len(results)
            data = query2dict(results)
            return dataReturn(f'成功搜索到{queryCount}篇文章', data=data)
        else:
            msg = f"没有搜索到相关文章"
            return dataReturn(msg=msg, code=0)


def createArticle(article_id, title, summary, body, tags, uid, country, is_publish, update_time, views):
    article = Article(title=title, summary=summary, body=body, tags=tags,
                      uid=int(uid), country=country, is_publish=int(is_publish), views=0)
    db.session.add(article)
    db.session.commit()
    for ele in tags.split('/'):
        tag.createTag(ele, '', '', 0)
    msg = f"文章【 {title} 】创建成功"
    return dataReturn(msg=msg)


def deleteArticle(article_id, title):
    results = Article.query.filter_by(article_id=article_id).first()
    if results:
        if results.title != title:
            msg = (f"标题与ID不匹配")
            return dataReturn(msg=msg)
        db.session.delete(results)
        db.session.commit()
        msg = f"成功删除文章,ID： {article_id},标题： {title}"
        code = 1
    else:
        msg = f"文章 {article_id} 不存在"
        code = 0
    return dataReturn(msg=msg, code=code)


def editArticle(article_id, title, summary, body, tags, uid, country, is_publish, created_time, update_time, views):
    results = Article.query.filter_by(article_id=article_id).first()
    if results is not None:
        results.title = title
        results.summary = summary
        results.body = body
        results.tags = tags
        results.uid = uid
        results.country = country
        results.is_publish = is_publish
        results.created_time = created_time
        results.update_time = datetime.now()
        for ele in tags.split('/'):
            tag.createTag(ele, '', '', 0)
        db.session.commit()
        msg = f"文章【{title}】修改成功"
        code = 1
    else:
        msg = f'标签 {article_id}: {title} 不存在'
        code = 0
    return dataReturn(msg=msg, code=code)


def uploadimg(imgdata):
    basedir = os.path.abspath(os.path.join(
        os.path.dirname( __file__ ), '..', 'static/upload/img'))
    if not os.path.exists(basedir):
        os.makedirs(basedir)
    imgName = imgdata.filename
    time = datetime.now()
    timeStr = str(time.strftime("%Y%m%d%H%M%S"))
    finalName = timeStr + imgName
    url = 'http://101.34.13.166:80/static/upload/img/' + finalName
    imgdata.save(os.path.join(basedir, finalName))

    #msg = f'图片上传成功'
    #data = {'url': str(url)}
    #dataReturn(msg=msg, data=data)
    data = {
                "errno": 0, 
                "data": {
                "url": str(url), 
                }
             }
    return data
