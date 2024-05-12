import logging
import os

from flasgger import Swagger
from flask import Flask, g
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine

from drawing_comp_backend.config import swagger_config, cors_config
from drawing_comp_backend.controller import auth_bp, challenge_bp, hello_bp
from drawing_comp_backend.repository import Teams, Challenges, Rounds
from drawing_comp_backend.service import AuthService, ChallengeService

logger = logging.getLogger("Drawing-Backend")

app = Flask(__name__)

# Register Route
app.register_blueprint(hello_bp, url_prefix="/api/hello")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(challenge_bp, url_prefix="/api/challenge")
logger.debug("Register Route Complete")
# Directory Config
project_dir = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(project_dir, 'data')
database_path = 'sqlite:///' + os.path.join(project_dir, 'data', 'database.db')
# App Config
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = database_path
app.config["SWAGGER"] = swagger_config
logger.debug("Load App Config Complete")

# DI Config
db = SQLAlchemy(app)
CORS(app, resources=cors_config)
Swagger(app)
migrate = Migrate()
logger.debug("Dependencies Injection Complete")

SQL_ENGINE = create_engine(database_path, echo=True)
# Migrate Database
# db.Base.metadata.create_all(SQL_ENGINE)
migrate.init_app(app, db)
teams = Teams(SQL_ENGINE)
auth_service = AuthService(logging, teams)
rounds = Rounds(SQL_ENGINE)
challenges = Challenges(SQL_ENGINE)
challenge_service = ChallengeService(logging, challenges, rounds)


@app.before_request
def load_blueprint():
    g.teams = teams
    g.auth_service = auth_service
    g.data_path = data_path
    g.challenge_service = challenge_service


if __name__ == "__main__":
    app.run(
        debug=os.environ.get("DEBUG", True),
        port=os.environ.get("PORT", 5000),
        host="0.0.0.0",
    )
    logger.debug("App Started")
    logger.debug(
        f"Swagger Endpoint: http://127.0.0.1:{os.environ.get('PORT', 5000)}/apidocs/"
    )
