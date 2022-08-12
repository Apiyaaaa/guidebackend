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
        msg = user.createUser(username,password)
        code = 1
        data = {'msg':msg, 'code':code}
        return jsonify(data)

@api_users.route('/delete_user', methods=['POST'])
def delete_user():
    if request.method == 'POST':
        data = request.args.get('data')
        username = data['user_name']request.args.get('user_name')
        uid = data['uid']
        msg = user.deleteUser(username,uid)
        code = 1
        data = {'msg':msg, 'code':code}
        return jsonify(data)

        
@api_users.route('/edit_user_status', methods=['POST'])
def edit_user_status():
    if request.method == 'POST':
        data = request.args.get('data')
        username = data['user_name']
        status = data['status']
        msg = user.editUserStatus(username,status)
        code = 1
        data = {'msg':msg, 'code':code}
        return jsonify(data)

@api_users.route('/edit_user_password', methods=['POST'])
def edit_user_password():
    if request.method == 'POST':
        data = request.args.get('data')
        username = data['user_name']
        password = data['password']
        new_password = data['new_password']
        msg = user.editUserPassword(username, password, new_password)
        code = 1
        data = {'msg':msg, 'code':code}
        return jsonify(data)


