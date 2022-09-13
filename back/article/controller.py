# This Python file uses the following encoding: utf-8
from urllib import response
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import article.service as article
from utils.utils import query2dict, dataReturn
import json


api_articles = Blueprint('articles', 'articles',url_prefix='/api/articles')


@api_articles.route('/get_article', methods=['GET'])
def get_article():
    if request.method == 'GET':
        article_id = request.args.get('article_id')
        title = request.args.get('title')
        page = request.args.get('page')
        response = article.getArticle(article_id, title,page)
        return jsonify(response)


@api_articles.route('/delete_article', methods=['POST'])
def delete_article():
    if request.method == 'POST':
        data = request.form
        print(json.loads(data['data']))
        response = article.deleteArticle(**json.loads(data['data']))
        return jsonify(response)


@api_articles.route('/edit_article', methods=['POST'])
def edit_article():
    if request.method == 'POST':
        data = request.form
        # print(json.loads(data['data']))
        response = article.editArticle(**json.loads(data['data']))
        return jsonify(response)


@api_articles.route('/create_article', methods=['POST'])
def create_article():
    if request.method == 'POST':
        data = request.form
        # data = json.loads(data)
        response = article.createArticle(**json.loads(data['data']))
        
        return jsonify(response)
    
@api_articles.route('/upload_img', methods=['POST'])
def upload_img():
    if request.method == 'POST':
        img = request.files['wangeditor-uploaded-image']
        if img:
            response = article.uploadimg(img)
            return jsonify(response)
