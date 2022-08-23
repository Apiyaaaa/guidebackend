# This Python file uses the following encoding: utf-8
from flask import Flask, Blueprint
from user.controller import api_users
from tag.controller import api_tags
from config import app, db


app.register_blueprint(api_users)

app.register_blueprint(api_tags)

app.register_blueprint(api_tags)

if __name__ == '__main__':
    # db.drop_all()
    db.create_all()
    app.run(port=80, debug=True)
    