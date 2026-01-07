from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from database import engine, get_db
from models import Base, Project, Log
from schemas import (
    ProjectCreate,
    ProjectResponse,
    LogResponse,
    ProjectDetailResponse
)
from orchestrator import run_project_orchestrator

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Autonomous AI Project Manager")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- ROOT ----------------
@app.get("/")
def root():
    return {"message": "Autonomous AI Project Manager API running 🚀"}

# ---------------- PROJECTS ----------------
@app.post("/projects", response_model=ProjectResponse)
def create_project(data: ProjectCreate, db: Session = Depends(get_db)):
    project = Project(
        name=data.name,
        goal=data.goal,
        status="PLANNING"
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    # 🔥 Run AI pipeline AFTER project is saved
    run_project_orchestrator(db, project)

    return project


@app.get("/projects", response_model=list[ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    return (
        db.query(Project)
        .order_by(Project.created_at.desc())
        .all()
    )


@app.get("/projects/{project_id}", response_model=ProjectDetailResponse)
def get_project_by_id(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return project


@app.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()

    return {"message": f"Project {project_id} deleted successfully"}

# ---------------- LOGS ----------------
@app.get("/projects/logs", response_model=list[LogResponse])
def get_all_logs(db: Session = Depends(get_db)):
    return (
        db.query(Log)
        .order_by(Log.created_at.desc())
        .all()
    )


@app.get("/projects/{project_id}/logs", response_model=list[LogResponse])
def get_project_logs(project_id: int, db: Session = Depends(get_db)):
    return (
        db.query(Log)
        .filter(Log.project_id == project_id)
        .order_by(Log.created_at.asc())
        .all()
    )



# main.py - Fixed /run endpoint with proper orchestrator call and error handling
@app.post("/projects/{project_id}/run")
def run_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    try:
        result = run_project_orchestrator(db, project)
        
        db.refresh(project)  #
        
        return {
            "status": "success",
            "message": "AI orchestrator executed successfully",
            "result": result
        }
    except Exception as e:
        db.add(Log(
            project_id=project.id,
            agent="Orchestrator",
            message=f"ERROR: {str(e)}"
        ))
        db.commit()
        raise HTTPException(status_code=500, detail=f"Orchestrator failed: {str(e)}")


# ---------------- AGENTS INFO ----------------
@app.get("/agents")
def agents():
    return [
        {"name": "Planner", "role": "Creates task plan"},
        {"name": "Executor", "role": "Executes tasks"},
        {"name": "Critic", "role": "Reviews output"},
        {"name": "Memory", "role": "Stores learning"},
    ]
