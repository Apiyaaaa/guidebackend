# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
from service import *


app.config['JSON_AS_ASCII'] = False

api_guide = Blueprint('api_guide', __name__, url_prefix='/api')


@api_guide.route('/create_user', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.form.get('user_name')
        username = data[username]
        password = data[password]
        token = data[token]
        if token == 'SDF8732HF':
            # CREATE NEW USER
            print(111)
        else:
            # login
            print('111')



