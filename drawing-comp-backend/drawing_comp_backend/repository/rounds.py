from sqlalchemy.orm import scoped_session, sessionmaker

from drawing_comp_backend.utils import managed_session
from drawing_comp_backend.models import db
import os

class Rounds:
    def __init__(self, sql_engine):
        self.sql_engine = sql_engine
        self.session_factory = scoped_session(sessionmaker(bind=self.sql_engine))

    def create_round(self, start_time, end_time):
        with managed_session(self.session_factory) as session:
            round = db.Round(
                start_time=start_time,
                end_time=end_time
            )
            session.add(round)
            session.commit()
            return round.id
        
    def query_round(self, round_id):
        with managed_session(self.session_factory) as session:
            round = (
                session.query(db.Round).filter_by(id=round_id, is_valid=True).first()
            )
            if round:
                round_data = {
                    "id": round.id,
                    "start_time": round.start_time,
                    "end_time": round.end_time
                }
                return round_data
            return None
    
    def del_round(self, round_id):
        with managed_session(self.session_factory) as session:
            round = (
                session.query(db.Round).filter_by(id=round_id).first()
            )
            if round:
                round.is_valid = False
                session.commit()
                return True
            return False
        
    def query_all_rounds(self):
        with managed_session(self.session_factory) as session:
            rounds = session.query(db.Round).filter_by(is_valid=True).all()
            round_data = []
            for round in rounds:
                round_data.append({
                    "id": round.id,
                    "start_time": round.start_time,
                    "end_time": round.end_time
                })
            return round_data
