# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import user.service as user


api_tags = Blueprint('users', 'users')


@api_tags.route('/create_tag', methods=['POST'])
def create_tag():
    if request.method == 'POST':
        user_name = request.form.get('user_name')
        password = request.form.get('user_password')
        msg = user.createUser(user_name, password, status='user')
        code = 1
        data = {'msg': msg, 'code': code}
        return jsonify(data)


@api_tags.route('/edit_tag', methods=['POST'])
def edit_tag():
    if request.method == 'POST':
        user_name = request.form.get('user_name')
        uid = request.form.get('uid')
        msg = user.deleteUser(user_name, uid)
        code = 1
        data = {'msg': msg, 'code': code}
        return jsonify(data)


@api_tags.route('/delete_tag', methods=['POST'])
def delete_tag():
    if request.method == 'POST':
        username = request.form.get('user_name')
        status = request.form.get('status')
        msg = user.editUserStatus(username, status)
        code = 1
        data = {'msg': msg, 'code': code}
        return jsonify(data)


@api_tags.route('/get_tags', methods=['GET'])
def get_tags():
    if request.method == 'GET':
        tag_id = request.args.get('tag_id')
        tag_name = request.form.get('tag_name')
        msg = user.editUserPassword(username, password, new_password)
        code = 1
        data = {'msg': msg, 'code': code}
        return jsonify(data)
