# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import user.service as user


api_users = Blueprint('users', 'users', url_prefix='/users')


@api_users.route('/create_user', methods=['POST'])
def create_user():
    if request.method == 'POST':
        user_name = request.form.get('user_name')
        password = request.form.get('user_password')
        msg = user.createUser(user_name, password, status='user')
        code = 1
        data = {'msg': msg, 'code': code}
        return jsonify(data)


@api_users.route('/delete_user', methods=['POST'])
def delete_user():
    if request.method == 'POST':
        user_name = request.form.get('user_name')
        uid = request.form.get('uid')
        msg = user.deleteUser(user_name, uid)
        code = 1
        data = {'msg': msg, 'code': code}
        return jsonify(data)


@api_users.route('/edit_user_status', methods=['POST'])
def edit_user_status():
    if request.method == 'POST':
        username = request.form.get('user_name')
        status = request.form.get('status')
        msg = user.editUserStatus(username, status)
        code = 1
        data = {'msg': msg, 'code': code}
        return jsonify(data)


@api_users.route('/edit_user_password', methods=['POST'])
def edit_user_password():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('user_password')
        new_password = request.form.get('new_passwprd')
        msg = user.editUserPassword(username, password, new_password)
        code = 1
        data = {'msg': msg, 'code': code}
        return jsonify(data)
