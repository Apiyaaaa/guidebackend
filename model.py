# This Python file uses the following encoding: utf-8
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import db
from datetime import datetime


class Article(db.Model):
    __tablename__ = 'articles'
    article_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    title = db.Column(db.String(255))
    summary = db.Column(db.String(255))
    body = db.Column(db.Text)
    created_time= db.Column(db.DateTime, default=datetime.now())
    update_time= db.Column(db.DateTime, default=datetime.now())
    views= db.Column(db.Integer)
    tags = db.Column(db.String(255))
    uid = db.Column(db.Integer)
    country = db.Column(db.String(20))
    public = db.Column(db.Integer, default=1)

class Lable(db.Model):
    __tablename__ = 'lable'
    label_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    label_name = db.Column(db.String(255))
    label_alias = db.Column(db.String(500))
    label_discription= db.Column(db.String(255))

class User(db.Model):
    __tablename__ = 'user'
    uid = db.Column(db.Integer, primary_key=True, autoincrement = True)
    user_name = db.Column(db.String(255))
    user_password = db.Column(db.String(500))
    created_time = db.Column(db.DateTime, default=datetime.now())

class Log(db.Model):
    __tablename__ = 'log'
    log_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    ip = db.Column(db.String(255))
    behavior = db.Column(db.String(500))
    created_time = db.Column(db.String(255), default=datetime.now())

