from pydantic import BaseModel
from datetime import datetime

# Схема для створення користувача
class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role_id: int

# Схема для авторизації
class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    role_id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class AthleteOut(BaseModel):
    id: int
    name: str
    medical_record: str | None

    class Config:
        from_attributes = True

class MedicalRecordCreate(BaseModel):
    details: str

class MedicalRecordOut(BaseModel):
    id: int
    athlete_id: int
    date: datetime
    details: str

    class Config:
        from_attributes = True

class TrainingSessionCreate(BaseModel):
    session_date: datetime
    duration: int
    description: str

class TrainingSessionOut(BaseModel):
    id: int
    athlete_id: int
    session_date: datetime
    duration: int
    description: str

    class Config:
        from_attributes = True
