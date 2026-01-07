from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class ProjectCreate(BaseModel):
    name: str
    goal: str


class ProjectResponse(BaseModel):
    id: int
    name: str
    goal: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class TaskResponse(BaseModel):
    id: int
    description: str
    status: str

    class Config:
        from_attributes = True

class LogResponse(BaseModel):
    id: int
    project_id: int
    agent: str
    message: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class ProjectDetailResponse(ProjectResponse):
    tasks: List[TaskResponse]
    logs: List[LogResponse]