# This Python file uses the following encoding: utf-8
from flask import Flask, Blueprint
from backend.user.controller import api 
from config import app


app.register_blueprint(api)

if __name__ == '__main__':
    # db.drop_all()
    db.create_all()
    app.run(port=80, debug=True)
    