# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import tag.service as tag


api_tags = Blueprint('users', 'users')


@api_tags.route('/create_tag', methods=['POST'])
def create_tag():
    if request.method == 'POST':
        tag_name = request.form.get('tag_name')
        tag_discription = request.form.get('tag_discription')
        msg = tag.createTag(tag_name, tag_discription)
        code = 1
        data = {'msg': msg, 'code': code}
        return jsonify(data)


@api_tags.route('/delete_tag', methods=['POST'])
def delete_tag():
    if request.method == 'POST':
        tag_name = request.form.get('user_name')
        uid = request.form.get('uid')
        msg = tag.deleteTag(user_name, uid)
        code = 1
        data = {'msg': msg, 'code': code}
        return jsonify(data)


@api_tags.route('/edit_tag', methods=['POST'])
def edit_tag():
    if request.method == 'POST':
        username = request.form.get('user_name')
        status = request.form.get('status')
        msg = tag.editTag(username, status)
        code = 1
        data = {'msg': msg, 'code': code}
        return jsonify(data)


@api_tags.route('/get_tags', methods=['GET'])
def get_tags():
    if request.method == 'GET':
        tag_id = request.args.get('tag_id')
        tag_name = request.form.get('tag_name')
        msg = tag.getTags(username, password, new_password)
        code = 1
        data = {'msg': msg, 'code': code}
        return jsonify(data)
