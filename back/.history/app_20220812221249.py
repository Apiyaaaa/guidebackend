# This Python file uses the following encoding: utf-8
from flask import Flask, Blueprint
from user.controller import api_users
from 
from config import app, db


app.register_blueprint(api_users)

if __name__ == '__main__':
    # db.drop_all()
    db.create_all()
    app.run(port=80, debug=True)
    