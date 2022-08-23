# This Python file uses the following encoding: utf-8
from model import User, Tag, Article
from config import *
from flask import jsonify
import os
import base64
from utils.utils import query2dict, dataReturn

#获取文章
def getArticle(word, page):
    articles = []
    
    if word == '':
        results = Article.query.filter_by(is_publish='1').all()
    else:
        results = Article.query.filter(Article.title.like(
            "%" +  + "%")).filter_by(is_publish='1').all()
        results = query2dict(results)
    return articles
    
# 获取tag
def gettags(words):
    tags = []
    if words == '':
        results = Lable.query.all()
    else:
        results = Lable.query.filter(Lable.label_name.like(
            "%" + words + "%") if words is not None else "").all()
    for i in results:
        data = {
            'label_id':i.label_id,
            'label_name': i.label_name,
            'label_alias': i.label_alias,
            'label_discription': i.label_discription,
        }
        tags.append(data)
    return tags

# 获取用户列表
def getusers(word, page):
    users = []
    if word == '':
        results = User.query.all()
        queryCount = len(results)
        if queryCount == 0:
            msg = '暂时还没有相关文章'
        else:
            msg = f'共搜索到{queryCount}篇文章'
    else:
        results = User.query.filter(Tag.user_name.like(
            "%" + words + "%") if words is not None else "").all()

    return users

def getarticle_by_id(id):
    data = {}
    if id:
        results = Article.query.filter_by(article_id=str(id)).first()
        if results:
            i = results
            data = {
                'article_id':i.article_id,
                'title': i.title,
                'summary': i.summary,
                'body': i.body,
                'update_time': i.update_time,
                'views': i.views,
                'tags': i.tags.split(','),
                'uid': i.uid,
                'country': i.country,
            }
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
