from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, ForeignKey, TIMESTAMP
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func

Base = declarative_base()

class Team(Base):
    __tablename__ = 'teams'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), unique=True, nullable=False)
    token = Column(String(255), unique=True, nullable=False)
    submissions = relationship('Submission', back_populates='team')  # Adjusted to plural to reflect potentially multiple submissions per team.
class Round(Base):
    __tablename__ = 'rounds'
    id = Column(Integer, primary_key=True, autoincrement=True)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    is_valid = Column(Boolean, default=True)
    challenges = relationship('Challenge', back_populates='round')
    submissions = relationship('Submission', back_populates='round')

class Challenge(Base):
    __tablename__ = 'challenges'
    id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(String(255))
    image_url = Column(String(255))
    round_id = Column(Integer, ForeignKey('rounds.id'), nullable=False)
    is_valid = Column(Boolean, default=True)
    round = relationship('Round', back_populates='challenges')
    submissions = relationship('Submission', back_populates='challenges')  # Adjusted to plural since multiple submissions could be related to one challenge.

class Submission(Base):
    __tablename__ = 'submissions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String(255), nullable=False)
    score = Column(Integer, default=0)
    team_id = Column(Integer, ForeignKey('teams.id'), nullable=False)
    challenge_id = Column(Integer, ForeignKey('challenges.id'), nullable=False)
    round_id = Column(Integer, ForeignKey('rounds.id'), nullable=False)
    team = relationship('Team', back_populates='submissions')
    challenges = relationship('Challenge', back_populates='submissions')
    round = relationship('Round', back_populates='submissions')

