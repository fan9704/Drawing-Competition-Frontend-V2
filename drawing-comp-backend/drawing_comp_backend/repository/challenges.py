from sqlalchemy.orm import scoped_session, sessionmaker

from drawing_comp_backend.utils import managed_session
from drawing_comp_backend.models import db
import os

class Challenges:
    def __init__(self, sql_engine):
        self.sql_engine = sql_engine
        self.session_factory = scoped_session(sessionmaker(bind=self.sql_engine))


    """
    ### Challenge
    """
    def create_challenge(self, round_id=1):   
        with managed_session(self.session_factory) as session:
            challenge = db.Challenge(
                round_id=round_id,
            )
            session.add(challenge)
            session.commit()
            return challenge.id
        
    def query_challenge(self, challenge_id):
        with managed_session(self.session_factory) as session:
            challenge = (
                session.query(db.Challenge).filter_by(id=challenge_id, is_valid=True).first()
            )
            if challenge:
                challenge_data = {
                    "id": challenge.id,
                    "description": challenge.description,
                    "image_url": challenge.image_url,
                    "round_id": challenge.round_id
                }
                return challenge_data
            return None
    
    def del_challenge(self, challenge_id):
        with managed_session(self.session_factory) as session:
            challenge = (
                session.query(db.Challenge).filter_by(id=challenge_id, is_valid=True).first()
            )
            if challenge:
                challenge.is_valid = False
                session.commit()
                return challenge_id
            return None
        
    def update_challenge(self, challenge_id, description, image_url, round_id):
        with managed_session(self.session_factory) as session:
            challenge = (
                session.query(db.Challenge).filter_by(id=challenge_id, is_valid=True).first()
            )
            if challenge:
                if description:
                    challenge.description = description
                if image_url:
                    challenge.image_url = image_url
                if round_id:
                    challenge.round_id = round_id
                session.commit()
                return challenge_id
            return None
        
    def query_all_challenges(self):
        with managed_session(self.session_factory) as session:
            challenges = session.query(db.Challenge).filter_by(is_valid=True).all()
            challenge_data = []
            for challenge in challenges:
                challenge_data.append({
                    "id": challenge.id,
                    "description": challenge.description,
                    "image_url": challenge.image_url,
                    "round_id": challenge.round_id
                })
            return challenge_data