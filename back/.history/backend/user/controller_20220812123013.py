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
        msg = createUser(username,password)
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

        
@api_guide.route('/edit_user_status', methods=['POST'])
def edit_user_status():
    if request.method == 'POST':
        data = request.args.get('data')
        username = data['user_name']
        status = data['status']
        msg = edit_user_status(username,status)
        code = 1
        data = {'msg':msg, 'code':code}
        return jsonify(data)


