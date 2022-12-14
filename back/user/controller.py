# This Python file uses the following encoding: utf-8
from urllib import response
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import user.service as user


api_users = Blueprint('users', 'users', url_prefix='/api/users')


@api_users.route('/create_user', methods=['POST'])
def create_user():
    if request.method == 'POST':
        data = json.loads(request.form['data'])
        print(data)
        user_name = data['user_name']
        user_password = data['user_password']
        status = 'normal'
        response = user.createUser(user_name, user_password, status)
        return jsonify(response)


@api_users.route('/get_users', methods=['GET'])
def get_users():
    if request.method == 'GET':
        uid = request.args.get('uid')
        user_name = request.args.get('user_name')
        response = user.getUsers(uid, user_name)
        return jsonify(response)


@api_users.route('/delete_user', methods=['POST'])
def delete_user():
    if request.method == 'POST':
        data = json.loads(request.form['data'])
        uid = data['uid']
        user_name = data['user_name']
        response = user.deleteUser(user_name, uid)
        return jsonify(response)


@api_users.route('/edit_user', methods=['POST'])
def edit_user():
    if request.method == 'POST':
        data = json.loads(request.form['data'])
        # print(data)
        uid = data['uid']
        user_name = data['user_name']
        user_password = data['user_password']
        status = data['status']
        response = user.editUser(uid, user_name, user_password, status)
        return jsonify(response)



