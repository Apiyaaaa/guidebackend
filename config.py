# This Python file uses the following encoding: utf-8
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
username = 'root'
password = '123456'
host = 'localhost'
database = 'guide'
class Config:
    
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://%s:%s@%s/%s?charset=UTF8MB4' % (username, password, host, database)
    SQLALCHEMY_TRACK_MODIFICATION = False

app.config.from_object(Config)

db = SQLAlchemy(app)