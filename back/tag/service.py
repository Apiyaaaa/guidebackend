# This Python file uses the following encoding: utf-8
from model import Tag
from config import db
from flask import jsonify
from utils.utils import query2dict, dataReturn

def createTag(tag_name, tag_alias,tag_discription,tag_id):
    results = Tag.query.filter_by(tag_name=tag_name).first()
    if results is None:
        tag = Tag(tag_name=tag_name, tag_discription=tag_discription,tag_alias=tag_alias)
        db.session.add(tag)
        db.session.commit()
        msg = f"标签【{tag_name}】创建成功"
        code = 1
    else:
        msg = f'标签【{tag_name}】已存在'
        code = 0
    return dataReturn(msg=msg,code =code)

def deleteTag(tag_name, tag_id):
    results = Tag.query.filter_by(tag_id=tag_id).first()
    if results:
        print(results.tag_name,tag_name)
        if results.tag_name != tag_name:
            return (f"标签与ID不匹配")
        db.session.delete(results)
        db.session.commit()
        msg = f"成功删除标签 【{tag_name}】"
        code = 1
    else:
        msg = f"标签 【{tag_name}】 不存在"
        code = 0
    return dataReturn(msg=msg,code=code)
    

def editTag(tag_id, tag_discription, tag_name, tag_alias=''):
    results = Tag.query.filter_by(tag_id=tag_id).first()
    if results is not None:
        results.tag_name = tag_name
        results.tag_discription = tag_discription
        results.tag_alias = tag_alias
        
        db.session.commit()
        msg = f"标签【{tag_name}】修改成功"
        code = 1
    else:
        msg = f'标签 【{tag_id}] 不存在'
        code = 0

    return dataReturn(msg=msg,code=code)


def getTags(tag_id=None, tag_name=None):
    if not tag_id and not tag_name:
        results = Tag.query.all()
    elif tag_id != None and tag_name is None:
        results = Tag.query.filter_by(tag_id=tag_id).first()
    elif tag_name != None and tag_id is None:
        results = Tag.query.filter_by(tag_name=tag_name).first()
    elif tag_id and tag_name :
        results = Tag.query.filter(
        Tag.tag_name.like("%" + str(tag_name) + "%")|
        Tag.tag_id.like("%" + str(tag_id) + "%")).all()
    if(not results or len(results) == 0):
        msg = f"标签 {tag_name}/{tag_id} 不存在"
        return dataReturn(msg=msg,code = 0)
    if len(results)>0:
        queryCount = len(results)
        data = query2dict(results)
        return dataReturn(f'成功搜索到{queryCount}个标签，搜索条件{tag_id}/{tag_name}',data=data)
    


