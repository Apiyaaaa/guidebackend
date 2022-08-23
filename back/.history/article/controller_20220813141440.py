# This Python file uses the following encoding: utf-8
from flask import Flask, request, json, jsonify, Blueprint
from requests import RequestException
import tag.service as tag


api_tags = Blueprint('tags', 'tags')


@api_tags.route('/get_article', methods=['POST'])
def create_tag():
    if request.method == 'POST':
        tag_name = request.form.get('tag_name')
        tag_discription = request.form.get('tag_discription')
        response = tag.createTag(tag_name, tag_discription)
        return jsonify(response)


@api_tags.route('/delete_tag', methods=['POST'])
def delete_tag():
    if request.method == 'POST':
        tag_name = request.form.get('tag_name')
        tag_id = request.form.get('tag_id')
        response = tag.deleteTag(tag_name, tag_id)
        return jsonify(response)


@api_tags.route('/edit_tag', methods=['POST'])
def edit_tag():
    if request.method == 'POST':
        tag_id = request.form.get('tag_id')
        tag_discription = request.form.get('tag_discription')
        tag_alias = request.form.get('tag_alias')
        tag_name = request.form.get('tag_name')
        response = tag.editTag(tag_id, tag_discription, tag_alias, tag_name)
        return jsonify(response)


@api_tags.route('/get_tags', methods=['GET'])
def get_tags():
    if request.method == 'GET':
        tag_id = request.args.get('tag_id')
        tag_name = request.form.get('tag_name')
        print(tag_id, tag_name)
        response = tag.getTags(tag_id, tag_name)
        return jsonify(response)
