# This Python file uses the following encoding: utf-8
from cgitb import reset
from model import User, Tag, Article
from config import *
from flask import jsonify
import os
import base64
from utils.utils import query2dict, dataReturn

#获取文章
def getArticle(word, page):
    page = int(page)
    if word == '':
        results = Article.query.filter_by(is_publish=1).paginate(page=page, per_page=20, error_out=False).items
    else:
        results = Article.query.filter(Article.title.like(
            "%" + str(word) + "%")).filter_by(is_publish='1').paginate(page=page, per_page=20, error_out=False).items
    results = query2dict(results)
    queryCount = len(results)
    msg = f"共有{queryCount}篇文章"
    return dataReturn(msg=msg, data=results)
    
# 获取tag
def getTags():
    tags = []
    results = Tag.query.all()
    queryCount = len(results)
    data = query2dict(results)
    msg = f'共搜索到{queryCount}条标签'
    return dataReturn(msg=msg, data=data)


def article(article_id):
    if article_id:
        results = Article.query.filter_by(article_id=article_id).first()
        if results:
            msg = f'文章搜索成功'
            return dataReturn(msg=msg, data=results)
        else:
            msg = f'文章不存在'
            return data


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
    return str(url)
