# This Python file uses the following encoding: utf-8
from model import User, Tag, Article
from config import db
from flask import jsonify

import base64
from utils.utils import first2dict, query2dict, dataReturn

#获取文章
def getArticle(word, page):
    # page = int(page)
    if word == '':
        # .paginate(page=page, per_page=20, error_out=False)
        results = Article.query.filter_by(is_publish=1).all()
    else:
        # .paginate(page=page, per_page=20, error_out=False)
        results = Article.query.filter(Article.title.like(
            "%" + str(word) + "%")).filter_by(is_publish=1).all()
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
            data = first2dict(results)
            return dataReturn(msg=msg, data=data)
        else:
            msg = f'文章不存在'
            return dataReturn(msg=msg)

