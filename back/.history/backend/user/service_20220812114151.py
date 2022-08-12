# This Python file uses the following encoding: utf-8
from model import *
from config import *
from flask import jsonify
import os
import base64

def createUser(user_name, user_password):
    results = User.query.filter_by(user_name='user_name').first
