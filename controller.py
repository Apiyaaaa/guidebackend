# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from service import *


app.config['JSON_AS_ASCII'] = False

api_guide = Blueprint('api_guide', __name__, url_prefix='/api')

@api_guide.route('/upload_article', methods=['POST'])
def upload_article():
    if request.method == 'POST':
        data = request.get_json()
        article = Article()
        if data['title'] != '' and data['summary'] != '' and data['tags'] != '' and data['country'] != '' and data['is_publish'] != '':
            
            print(data)
            db.session.add(article)
            db.session.commit()
            return 'saved'
        else:
            print(data)
            return 'something not filled'
    
