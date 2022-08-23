# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import index.service as index


api_index = Blueprint('index', 'index')


@api_index.route('/login', methods=['POST'])
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


@api_index.route('/upload_article', methods=['POST'])
def upload_article():
    if request.method == 'POST':
        data = json.loads(request.form.get('data'))
        # img = request.files['img']
        # url = upload_img(img)
        article = Article(**data, views=0, uid=1)
        if data['title'] != '' and data['summary'] != '' and data['tags'] != '' and data['country'] != '' and data['is_publish'] != '':
            db.session.add(article)
            db.session.commit()
            return 'saved'
        else:
            return 'something not filled'
    else:
        return 'POST not GET'


#
@api_index.route('/article', methods=['GET'])
def search_article():
    if request.method == 'GET':
        data = request.arg
        if request.args.get('word'):
            word = request.args.get('word')
            page = request.args.get('page')
            data = getarticle(word)
        else:
            data = getarticle('')
        if len(data) == 0:
            return 'nodata'
        return jsonify(data)


@api_index.route('/get_tags', methods=['GET'])
def get_tags():
    if request.method == 'GET':
        print(request.args.get('word'))
        if request.args.get('word'):
            word = request.args.get('word')
            data = gettags(word)
        else:
            data = gettags('')
        if len(data) == 0:
            return 'nodata'
        return jsonify(data)


@api_index.route('/get_users', methods=['GET'])
def get_users():
    if request.method == 'GET':
        print(request.args.get('word'))
        if request.args.get('word'):
            word = request.args.get('word')
            data = getusers(word)
        else:
            data = getusers('')
        if len(data) == 0:
            return 'nodata'
        return jsonify(data)


@api_index.route('/get_article', methods=['GET'])
def get_article():
    if request.method == 'GET':
        print(request.args)
        data = []
        if request.args.get('article_id'):
            id = request.args.get('article_id')
            data = getarticle_by_id(id)
        if len(data) == 0:
            return 'nodata'
        for i in data:
            print(data)
        return jsonify(data)


@api_index.route('/upload_img', methods=['POST'])
def upload_img():
    if request.method == 'POST':
        img = request.files['wangeditor-uploaded-image']
        msg = {"errno": 0, "data": {"url": uploadimg(img)}}
        return jsonify(msg)

