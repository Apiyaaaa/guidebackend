# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
from service import *


app.config['JSON_AS_ASCII'] = False

api_guide = Blueprint('api_guide', __name__, url_prefix='/api')


@api_guide.route('/create_user', methods=['POST'])
def create_user():
    if request.method == 'POST':
        data = request.args.get('data')
        username = data['username']
        password = data['user_password']
        msg = create_user(username,password)
        code = 1
        data = {'msg':msg, 'code':code}
        return jsonify(data)

@api_guide.route('/delete_user', methods=['POST'])
def delete_user():
    if request.method == 'POST':
        data = request.args.get('data')
        username = data['user_name']
        uid = data['uid']
        msg = deleteUser(username,uid)
        code = 1
        data = {'msg':msg, 'code':code}
        return jsonify(data)

        
@api_guide.route('/delete_user', methods=['POST'])
def delete_user():
    if request.method == 'POST':
        data = request.args.get('data')
        username = data['user_name']
        uid = data['uid']
        msg = deleteUser(username,uid)
        code = 1
        data = {'msg':msg, 'code':code}
        return jsonify(data)


