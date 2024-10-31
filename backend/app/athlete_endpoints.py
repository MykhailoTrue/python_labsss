from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db

router = APIRouter()

@router.get("/athletes", response_model=list[schemas.AthleteOut])
def get_athletes(db: Session = Depends(get_db)):
    athletes = db.query(models.Athlete).all()
    return athletes

@router.get("/athletes/{athlete_id}/medical_records", response_model=list[schemas.MedicalRecordOut])
def get_medical_records(athlete_id: int, db: Session = Depends(get_db)):
    records = db.query(models.MedicalRecord).filter(models.MedicalRecord.athlete_id == athlete_id).all()
    if not records:
        raise HTTPException(status_code=404, detail="Medical records not found")
    return records

@router.post("/athletes/{athlete_id}/medical_records", response_model=schemas.MedicalRecordOut)
def create_medical_record(athlete_id: int, record: schemas.MedicalRecordCreate, db: Session = Depends(get_db)):
    athlete = db.query(models.Athlete).get(athlete_id)
    if not athlete:
        raise HTTPException(status_code=404, detail="Athlete not found")
    new_record = models.MedicalRecord(athlete_id=athlete_id, details=record.details)
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record

@router.get("/athletes/{athlete_id}/training_sessions", response_model=list[schemas.TrainingSessionOut])
def get_training_sessions(athlete_id: int, db: Session = Depends(get_db)):
    sessions = db.query(models.TrainingSession).filter(models.TrainingSession.athlete_id == athlete_id).all()
    if not sessions:
        raise HTTPException(status_code=404, detail="Training sessions not found")
    return sessions

@router.post("/athletes/{athlete_id}/training_sessions", response_model=schemas.TrainingSessionOut)
def create_training_session(athlete_id: int, session: schemas.TrainingSessionCreate, db: Session = Depends(get_db)):
    athlete = db.query(models.Athlete).get(athlete_id)
    if not athlete:
        raise HTTPException(status_code=404, detail="Athlete not found")
    new_session = models.TrainingSession(
        athlete_id=athlete_id,
        session_date=session.session_date,
        duration=session.duration,
        description=session.description
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session
