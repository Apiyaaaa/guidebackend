# This Python file uses the following encoding: utf-8
from flask import Flask, Blueprint
from user.controller import api_users
from tag.controller import api_tags
from article.controller import api_articles
from index.controller import api_indexs
from login.controller import api_login
from config import app, db


app.register_blueprint(api_users)

app.register_blueprint(api_tags)

app.register_blueprint(api_articles)

app.register_blueprint(api_indexs)

app.register_blueprint(api_login,url_prefix='/api/login')


if __name__ == '__main__':
    db.create_all()
    app.run(port=8080, debug=True)
    