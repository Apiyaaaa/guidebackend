# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import article.service as article


api_articles = Blueprint('articles', 'articles')


@api_articles.route('/get_article', methods=['GET'])
def get_article():
    if request.method == 'GET':
        article_id = request.args.get('article_id')
        title = request.args.get('title')
        response = article.getArticle(article_id, title)
        return jsonify(response)


@api_articles.route('/delete_article', methods=['POST'])
def delete_article():
    if request.method == 'POST':
        tag_name = request.form.get('tag_name')
        tag_id = request.form.get('tag_id')
        response = article.deleteTag(tag_name, tag_id)
        return jsonify(response)


@api_articles.route('/edit_article', methods=['POST'])
def edit_article():
    if request.method == 'POST':
        tag_id = request.form.get('tag_id')
        tag_discription = request.form.get('tag_discription')
        tag_alias = request.form.get('tag_alias')
        tag_name = request.form.get('tag_name')
        response = article.editTag(tag_id, tag_discription, tag_alias, tag_name)
        return jsonify(response)


@api_articles.route('/create_article', methods=['POST'])
def create_article():
    if request.method == 'POST':
        tag_id = request.form.get('data')
        tag_name = request.form.get('tag_name')
        print(tag_id, tag_name)
        response = article.createArticle(tag_id, tag_name)
        return jsonify(response)
