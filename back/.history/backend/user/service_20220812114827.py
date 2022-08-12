# This Python file uses the following encoding: utf-8
from model import *
from config import *
from flask import jsonify
import os
import base64

def createUser(user_name, user_password, status='normal'):
    results = User.query.filter_by(user_name='user_name').first()
    if results == 0:
        user = User(user_name=user_name, user_password=user_password, status=status)
        db.session.add(user)
        db.session.commit()
        return f"用户%s创建成功"%(user_name)
