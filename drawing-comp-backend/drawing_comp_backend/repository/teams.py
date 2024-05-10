from sqlalchemy.orm import scoped_session, sessionmaker

from utils import managed_session
from models import db
import os

class Teams:
    def __init__(self, sql_engine):
        self.sql_engine = sql_engine
        self.session_factory = scoped_session(sessionmaker(bind=self.sql_engine))

    def create_team(self, team_name="newTeam"):
        with managed_session(self.session_factory) as session:
            team = db.Team(
                name=team_name
            )
            session.add(team)
            session.commit()
            return team.id
        
    def query_problem(self, team_id):
        with managed_session(self.session_factory) as session:
            team = (
                session.query(db.Problem).filter_by(id=team_id).first()
            )
            if team:
                team_data = {
                    "name": team.name,
                    "token": team.token
                }
                return team_data
            return None