# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import tag.service as tag


api_tags = Blueprint('tags', 'tags', url_prefix='/api/tags')


@api_tags.route('/create_tag', methods=['POST'])
def create_tag():
    if request.method == 'POST':
        data = request.form
        # tag_name = request.form.get('tag_name')
        # tag_alias = request.form.get('tag_alias')
        # tag_discription = request.form.get('tag_discription')
        response = tag.createTag(**json.loads(data['data']))
        return jsonify(response)


@api_tags.route('/delete_tag', methods=['POST'])
def delete_tag():
    if request.method == 'POST':
        data =request.form
        print(data)
        # tag_name = data['data']['tag_name']
        # tag_id = data['data']['tag_id']
        response = tag.deleteTag(**json.loads(data['data']))
        return jsonify(response)


@api_tags.route('/edit_tag', methods=['POST'])
def edit_tag():
    if request.method == 'POST':
        data = request.form
        print(data)
        # tag_id = request.form.get('tag_id')
        # tag_discription = request.form.get('tag_discription')
        # tag_alias = request.form.get('tag_alias')
        # tag_name = request.form.get('tag_name')
        response = tag.editTag(**json.loads(data['data']))
        return jsonify(response)


@api_tags.route('/get_tags', methods=['GET'])
def get_tags():
    if request.method == 'GET':
        tag_id = request.args.get('tag_id')
        tag_name = request.args.get('tag_name')
        print(tag_id, tag_name)
        response = tag.getTags(tag_id, tag_name)
        return jsonify(response)
