# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import tag.service as tag


api_tags = Blueprint('tags', 'tags')


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
        tag_name = request.form.get('tag_name')
        tag_id = request.form.get('tag_id')
        msg = tag.deleteTag(tag_name, tag_id)
        code = 1
        data = {'msg': msg, 'code': code}
        return jsonify(data)


@api_tags.route('/edit_tag', methods=['POST'])
def edit_tag():
    if request.method == 'POST':
        tag_id = request.form.get('tag_id')
        tag_discription = request.form.get('tag_discription')
        tag_alias = request.form.get('tag_alias')
        tag_name = request.form.get('tag_name')
        res = tag.editTag(tag_id, tag_discription, tag_alias, tag_name)
        return jsonify(data)


@api_tags.route('/get_tags', methods=['GET'])
def get_tags():
    if request.method == 'GET':
        tag_id = request.args.get('tag_id')
        tag_name = request.form.get('tag_name')
        print(tag_id, tag_name)
        data = tag.getTags(tag_id, tag_name)
        print(data)
        code = 1
        data1 = {'msg': data, 'code': code}
        return jsonify(data)
