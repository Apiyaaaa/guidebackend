# This Python file uses the following encoding: utf-8
from flask import Flask, make_response, json, jsonify, Blueprint
from service import *


app.config['JSON_AS_ASCII'] = False

api_cmap = Blueprint('api_cmap', __name__)

@api_cmap.route('/cmap', methods=['GET'])
def cmap():
    response = getdata()
    response = jsonify(response)
    return response
