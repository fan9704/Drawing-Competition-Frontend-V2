from flask import Flask, request, g
from sqlalchemy import create_engine
# from flask_sqlalchemy import SQLAlchemy
import os
from sqlalchemy import create_engine, ForeignKey
from models import db
from repository import Teams
from service import AuthService
import logging

app = Flask(__name__)

project_dir = os.path.dirname(os.path.abspath(__file__))
data_path = 'sqlite:///'+ os.path.join(project_dir, 'data', 'database.db')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
# app.config['SQLALCHEMY_DATABASE_URI'] = data_path

# db = SQLAlchemy(app)

SQL_ENGINE = create_engine(data_path, echo=True)
db.Base.metadata.create_all(SQL_ENGINE)
teams = Teams(SQL_ENGINE)
auth_service = AuthService(logging, teams)
@app.before_request
def load_blueprint():
    g.teams = teams
    g.auth_service = auth_service
from controller import auth_bp

app.register_blueprint(auth_bp, url_prefix="/auth")

if __name__ == "__main__":
    app.run(debug=True)
