from fastapi import FastAPI
from app import models
from app.database import engine, SessionLocal
from app.auth_endpoints import router as auth_router
from app.athlete_endpoints import router as athlete_router
from datetime import datetime  # Додаємо імпорт datetime

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

# Підключення маршрутів
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(athlete_router, prefix="/athletes", tags=["athletes"])

# Початкове заповнення даних
def seed_db(db: SessionLocal):
    if not db.query(models.Role).first():
        roles = [models.Role(id=1, name="user"), models.Role(id=2, name="admin")]
        db.add_all(roles)
        db.commit()

    if not db.query(models.Athlete).first():
        athletes = [
            models.Athlete(name="John Doe", medical_record="Healthy"),
            models.Athlete(name="Jane Smith", medical_record="Minor injuries")
        ]
        db.add_all(athletes)
        db.commit()

    if not db.query(models.MedicalRecord).first():
        medical_records = [
            models.MedicalRecord(athlete_id=1, details="Checkup: All clear"),
            models.MedicalRecord(athlete_id=2, details="Sprain recovery")
        ]
        db.add_all(medical_records)
        db.commit()

    if not db.query(models.TrainingSession).first():
        sessions = [
            models.TrainingSession(athlete_id=1, session_date=datetime.utcnow(), duration=60, description="Strength training"),
            models.TrainingSession(athlete_id=2, session_date=datetime.utcnow(), duration=45, description="Cardio")
        ]
        db.add_all(sessions)
        db.commit()

# Виконати seed_db на початку
with SessionLocal() as db:
    seed_db(db)
