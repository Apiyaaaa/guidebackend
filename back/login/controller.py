# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import user.service as user


api_login = Blueprint('login',__name__)


# ------------- 登陆页面 ------------------

@api_login.route('/login_user', methods=['GET'])
def login_user():
    if request.method == 'GET':
        user_password = request.args.get('user_password')
        user_name = request.args.get('user_name')
        response = user.loginUser(user_name,user_password)
        return jsonify(response)


@api_login.route('/register_user', methods=['POST'])
def register_user():
    if request.method == 'POST':
        data = json.loads(request.form['data'])
        
        user_name = data['user_name']
        user_password = data['user_password']
        invitationCode = data['invitationCode']
        response = user.registerUser(user_name, user_password, invitationCode)
        return jsonify(response)


@api_login.route('/check_username', methods=['GET'])
def check_username():
    if request.method == 'GET':
        uid = None
        print(request.args)
        user_name = request.args.get('user_name')
        response = user.getUsers(uid, user_name)
        return jsonify(response)




