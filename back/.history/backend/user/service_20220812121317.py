# This Python file uses the following encoding: utf-8
from model import *
from config import *
import os
import base64

def createUser(user_name, user_password, status='normal'):
    results = User.query.filter_by(user_name='user_name').first()
    if not results:
        user = User(user_name=user_name, user_password=user_password, status=status)
        db.session.add(user)
        db.session.commit()
        return (f"用户 {user_name} 创建成功")

def deleteUser(user_name, uid):
    results = User.query.filter_by(user_name='user_name').first()
    if results[0].uid != uid:
        return (f"用户名与ID不匹配")
    if len(results) == 1:
        db.session.delete(results)
        db.session.commit()
        return (f"成功删除用户 {user_name}")
    else:
        return (f"用户名 {user_name} 不存在")
