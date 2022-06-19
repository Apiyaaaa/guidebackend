# This Python file uses the following encoding: utf-8
from model import *
from config import *
from flask import jsonify

def getarticle(words):
    articles = []
    if words == '':
        results = Article.query.filter_by(is_publish='1').limit(20).all()
    else:
        results = Article.query.filter(Article.title.like(
            "%" + words + "%") if words is not None else "").filter_by(is_publish='1').limit(5).all()
    for i in results:
        data = {
            'article_id':i.article_id,
            'title': i.title,
            'summary': i.summary,
            'update_time': i.update_time,
            'views': i.views,
            'tags': i.tags.split(','),
            'uid': i.uid,
            'country': i.country,
        }
        articles.append(data)
    return articles

