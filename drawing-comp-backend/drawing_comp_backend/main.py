<<<<<<< HEAD
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
=======
from flask import Flask
from sqlalchemy import create_engine
# from flask_sqlalchemy import SQLAlchemy
import os
from sqlalchemy import create_engine, ForeignKey
from repository import Teams
from models import db
>>>>>>> 2ce9155 (finish: backend db repository)

app = Flask(__name__)

<<<<<<< HEAD
origins = [
    "http://localhost:5173",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

=======
project_dir = os.path.dirname(os.path.abspath(__file__))
data_path = 'sqlite:///'+ os.path.join(project_dir, 'data', 'database.db')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
# app.config['SQLALCHEMY_DATABASE_URI'] = data_path
>>>>>>> 2ce9155 (finish: backend db repository)

# db = SQLAlchemy(app)

SQL_ENGINE = create_engine(data_path, echo=True)
db.Base.metadata.create_all(SQL_ENGINE)
teams = Teams(SQL_ENGINE)

@app.route("/")
def read_root():
    return {"Hello": "World"}


<<<<<<< HEAD
class TeamCode(BaseModel):
    code: str


@app.post("/api/teams/checkCode")
async def checkTeamCode(team_code: TeamCode):
    if team_code.code == "abcde":
        return {"teamId": "abcder"}
    raise HTTPException(status_code=404, detail="TEAM_CODE_NOT_FOUND")


# if __name__ == "__main__":
#     import uvicorn

#     uvicorn.run(app, host="127.0.0.1", port=8000)
=======
@app.route("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

if __name__ == "__main__":
    app.run(debug=True)
>>>>>>> 2ce9155 (finish: backend db repository)
