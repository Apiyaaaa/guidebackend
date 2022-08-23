# This Python file uses the following encoding: utf-8
from model import User
from config import db

def createUser(user_name, user_password, status='user'):
    print(us)
    results = User.query.filter_by(user_name=user_name).first()
    print(results, user_name)
    if results is None:
        user = User(user_name=user_name, user_password=user_password, status=status)
        db.session.add(user)
        db.session.commit()
        print(111)
        return (f"用户 {user_name} 创建成功")
    else:
        return (f'用户名已注册')

def deleteUser(user_name, uid):
    results = User.query.filter_by(user_name=user_name).first()
    if results.uid != uid:
        return (f"用户名与ID不匹配")
    if len(results) == 1:
        db.session.delete(results)
        db.session.commit()
        return (f"成功删除用户 {user_name}")
    else:
        return (f"用户名 {user_name} 不存在")

def editUserStatus(user_name, status):
    results = User.query.filter_by(user_name=user_name).first()
    if results:
        results.status = 'status'
        db.session.commit()
        return (f"成功更改用户 {user_name} 权限为 {status} ")
    else:
        return (f"用户 {user_name} 不存在")

def editUserPassword(user_name, password, new_password):
    results = User.query.filter_by(user_name=user_name).first()
    if password == results.password:
        results.password = new_password
        db.session.commit()
        return ("密码修改成功")
