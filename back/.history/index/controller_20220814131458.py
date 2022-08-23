# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import index.service as index


api_indexs = Blueprint('indexs', 'indexs', url_prefix='')


@api_indexs.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.form.get('data')
        username = data[username]
        password = data[password]
        token = data[token]
        if token == 'SDF8732HF':
            # CREATE NEW USER
            print(111)
        else:
            # login
            print('111')



@api_indexs.route('/article', methods=['GET'])
def search_article():
    if request.method == 'GET':
        word = request.args.get('word')
        page = request.args.get('page')
        response = index.getArticle(word, page)
        return jsonify(response)


@api_indexs.route('/get_tags', methods=['GET'])
def get_tags():
    if request.method == 'GET':
        response = index.getTags()
        return jsonify(response)


@api_indexs.route('/upload_img', methods=['POST'])
def upload_img():
    if request.method == 'POST':
        img = request.files['wangeditor-uploaded-image']
        msg = {"errno": 0, "data": {"url": index.uploadimg(img)}}
        return jsonify(msg)

