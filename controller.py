# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from service import *


app.config['JSON_AS_ASCII'] = False

api_guide = Blueprint('api_guide', __name__, url_prefix='/api')

@api_guide.route('/upload_article', methods=['POST'])
def upload_article():
    if request.method == 'POST':
        data = request.get_json()
        article = Article(**data, views=0,uid=1)
        print(type(data))
        if data['title'] != '' and data['summary'] != '' and data['tags'] != '' and data['country'] != '' and data['is_publish'] != '':
            db.session.add(article)
            db.session.commit()
            return 'saved'
        else:
            return 'something not filled'
    else:
        return 'POST not GET'
    
@api_guide.route('/search_article', methods=['GET'])
def search_article():
    if request.method =='GET':
        print(request.args.get('word'))
        if request.args.get('word'):
            word = request.args.get('word')
            data = getarticle(word)
        else:
            data = getarticle('')
        if len(data) == 0:
            return 'nodata'
        return jsonify(data)