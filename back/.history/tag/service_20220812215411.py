# This Python file uses the following encoding: utf-8
from model import Tag
from config import db

def createTag(tag_name, tag_discription):
    results = Tag.query.filter_by(tag_name=tag_name).first()
    if results is None:
        tag = Tag(tag_name=tag_name, tag_discription=tag_discription)
        db.session.add(tag)
        db.session.commit()
        return (f"标签 {tag_name} 创建成功")
    else:
        return (f'标签已存在')

def deletetag(tags_name, uid):
    results = User.query.filter_by(user_name=user_name).first()
    if results.uid != uid:
        return (f"用户名与ID不匹配")
    if len(results) == 1:
        db.session.delete(results)
        db.session.commit()
        return (f"成功删除用户 {user_name}")
    else:
        return (f"用户名 {user_name} 不存在")

def edit_tag(user_name, password, new_password):
    results = User.query.filter_by(user_name=user_name).first()
    if password == results.password:
        results.password = new_password
        db.session.commit()
        return ("密码修改成功")

def get_tags(user_name, status):
    results = User.query.filter_by(user_name=user_name).first()
    if results:
        results.status = 'status'
        db.session.commit()
        return (f"成功更改用户 {user_name} 权限为 {status} ")
    else:
        return (f"用户 {user_name} 不存在")


