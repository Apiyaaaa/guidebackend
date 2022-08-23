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

def deletetag(tag_name, tag_id):
    results = Tag.query.filter_by(tag_name=tag_name).first()
    if results.tag_id != tag_id:
        return (f"标签与ID不匹配")
    if len(results) == 1:
        db.session.delete(results)
        db.session.commit()
        return (f"成功删除标签 {tag_name}")
    else:
        return (f"用户名 {tag_name} 不存在")

def edit_tag(tag_id, tag_discription, tag_alias, tag_name):
    results = Tag.query.filter_by(tag_id=tag_id).first()
    if results is not None:
        results.tag_name = tag_name
        results.tag_discription = tag_discription
        results.tag_alias = tag_alias
        
        db.session.commit()
        return ("密码修改成功")
    else:
        return ('')

def get_tags(user_name, status):
    results = User.query.filter_by(user_name=user_name).first()
    if results:
        results.status = 'status'
        db.session.commit()
        return (f"成功更改用户 {user_name} 权限为 {status} ")
    else:
        return (f"用户 {user_name} 不存在")


