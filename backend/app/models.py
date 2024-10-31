from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship, declarative_base
import datetime

Base = declarative_base()

class Role(Base):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)  # Додано поле для збереження хешу пароля
    role_id = Column(Integer, ForeignKey('roles.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    role = relationship('Role')

class Athlete(Base):
    __tablename__ = 'athletes'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    medical_record = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User')

class MedicalRecord(Base):
    __tablename__ = 'medical_records'
    id = Column(Integer, primary_key=True)
    athlete_id = Column(Integer, ForeignKey('athletes.id'))
    date = Column(DateTime, default=datetime.datetime.utcnow)
    details = Column(String)
    athlete = relationship('Athlete')

class TrainingSession(Base):
    __tablename__ = 'training_sessions'
    id = Column(Integer, primary_key=True)
    athlete_id = Column(Integer, ForeignKey('athletes.id'))
    session_date = Column(DateTime, default=datetime.datetime.utcnow)
    duration = Column(Integer)  # minutes
    description = Column(String)
    athlete = relationship('Athlete')
