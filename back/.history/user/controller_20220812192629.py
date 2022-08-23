# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import user.service as user


api_users = Blueprint('users', 'users')


@api_users.route('/create_user', methods=['POST'])
def create_user():
    if request.method == 'POST':
        username = request.args.get('username')
        password = request.args.get('user_password')
        msg = user.createUser(username,password, status)
        code = 1
        data = {'msg':msg, 'code':code}
        return jsonify(data)

@api_users.route('/delete_user', methods=['POST'])
def delete_user():
    if request.method == 'POST':
        username = request.args.get('user_name')
        uid = request.args.get('uid')
        msg = user.deleteUser(username,uid)
        code = 1
        data = {'msg':msg, 'code':code}
        return jsonify(data)

        
@api_users.route('/edit_user_status', methods=['POST'])
def edit_user_status():
    if request.method == 'POST':
        username = request.args.get('user_name')
        status = request.args.get('status')
        msg = user.editUserStatus(username,status)
        code = 1
        data = {'msg':msg, 'code':code}
        return jsonify(data)

@api_users.route('/edit_user_password', methods=['POST'])
def edit_user_password():
    if request.method == 'POST':
        username = request.args.get('username')
        password = request.args.get('user_password')
        new_password = request.args.get('new_passwprd')
        msg = user.editUserPassword(username, password, new_password)
        code = 1
        data = {'msg':msg, 'code':code}
        return jsonify(data)
