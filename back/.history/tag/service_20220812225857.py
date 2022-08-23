# This Python file uses the following encoding: utf-8
from model import Tag
from config import db
from flask import jsonify
from utils.utils import query2dict, dataReturn

def createTag(tag_name, tag_discription):
    results = Tag.query.filter_by(tag_name=tag_name).first()
    if results is None:
        tag = Tag(tag_name=tag_name, tag_discription=tag_discription)
        db.session.add(tag)
        db.session.commit()
        return (f"标签 {tag_name} 创建成功")
    else:
        return (f'标签已存在')

def deleteTag(tag_name, tag_id):
    results = Tag.query.filter_by(tag_name=tag_name).first()
    if results.tag_id != tag_id:
        return (f"标签与ID不匹配")
    if len(results) == 1:
        db.session.delete(results)
        db.session.commit()
        return (f"成功删除标签 {tag_name}")
    else:
        return (f"标签 {tag_name} 不存在")

def editTag(tag_id, tag_discription, tag_alias, tag_name):
    results = Tag.query.filter_by(tag_id=tag_id).first()
    if results is not None:
        results.tag_name = tag_name
        results.tag_discription = tag_discription
        results.tag_alias = tag_alias
        
        db.session.commit()
        return dataReturn(msg="标签修改成功")
    else:
        return (f'标签 {tag_id} 不存在')

def getTags(tag_id=None, tag_name=None):
    if tag_id is None and tag_name is None:
        results = Tag.query.all()
    elif tag_id != None:
        results = Tag.query.filter_by(tag_id=tag_id).first()
    elif tag_name != None:
        results = Tag.query.filter_by(tag_name=tag_name).first()
    else:
        return (f"标签 {tag_name}{tag_id} 不存在")
    if len(results)>0:
        data = query2dict(results)
        dataReturn()
    


