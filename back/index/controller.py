# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import index.service as index


api_indexs = Blueprint('indexs', 'indexs', url_prefix='/api')


@api_indexs.route('/get_article', methods=['GET'])
def get_article():
    if request.method == 'GET':
        word = request.args.get('word')
        page = request.args.get('page')
        response = index.getArticle(word, page)
        return jsonify(response)
    
@api_indexs.route('/article', methods=['GET'])
def article():
    if request.method == 'GET':
        article_id = request.args.get('article_id')
        response = index.article(article_id)
        return jsonify(response)


@api_indexs.route('/get_tags', methods=['GET'])
def get_tags():
    if request.method == 'GET':
        response = index.getTags()
        return jsonify(response)


