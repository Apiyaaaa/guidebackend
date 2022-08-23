# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import article.service as article


api_articles = Blueprint('articles', 'articles')


@api_articles.route('/get_article', methods=['GET'])
def get_article():
    if request.method == 'GET':
        tag_name = request.ar.get('tag_name')
        tag_discription = request.form.get('tag_discription')
        response = article.createTag(tag_name, tag_discription)
        return jsonify(response)


@api_articles.route('/delete_tag', methods=['POST'])
def delete_tag():
    if request.method == 'POST':
        tag_name = request.form.get('tag_name')
        tag_id = request.form.get('tag_id')
        response = article.deleteTag(tag_name, tag_id)
        return jsonify(response)


@api_articles.route('/edit_tag', methods=['POST'])
def edit_tag():
    if request.method == 'POST':
        tag_id = request.form.get('tag_id')
        tag_discription = request.form.get('tag_discription')
        tag_alias = request.form.get('tag_alias')
        tag_name = request.form.get('tag_name')
        response = article.editTag(tag_id, tag_discription, tag_alias, tag_name)
        return jsonify(response)


@api_articles.route('/get_tags', methods=['GET'])
def get_tags():
    if request.method == 'GET':
        tag_id = request.args.get('tag_id')
        tag_name = request.form.get('tag_name')
        print(tag_id, tag_name)
        response = tag.getTags(tag_id, tag_name)
        return jsonify(response)
