from sqlalchemy.orm import Session

from agents.planner import PlannerAgent
from agents.executor import ExecutorAgent
from agents.critic import CriticAgent

from models import Project, Task, Execution, Review, Log



def run_project_orchestrator(db: Session, project: Project):
    try:
        planner = PlannerAgent()
        executor = ExecutorAgent()
        critic = CriticAgent()

        db.add(Log(
            project_id=project.id,
            agent="Orchestrator",
            message="Starting autonomous project execution..."
        ))
        db.commit()

        plan_tasks = planner.plan(project.goal)

        db.add(Log(
            project_id=project.id,
            agent="Planner",
            message=f"Generated {len(plan_tasks)} tasks:\n" + "\n".join([f"- {t}" for t in plan_tasks[:5]])  # First 5 tasks
        ))
        db.commit()

        for i, task_description in enumerate(plan_tasks, 1):
            try:
                task = Task(
                    project_id=project.id,
                    description=task_description,
                    status="IN_PROGRESS"
                )
                db.add(task)
                db.commit()
                db.refresh(task)

                # Execute task
                execution_output = executor.execute(task_description)

                db.add(Log(
                    project_id=project.id,
                    agent="Executor",
                    message=execution_output
                ))
                db.commit()

                # Review
                review_result = critic.review(execution_output)

                db.add(Log(
                    project_id=project.id,
                    agent="Critic",
                    message=f"Task {i}: {review_result['decision']} - {review_result.get('reason', 'No reason')}"
                ))
                db.commit()

                if review_result["decision"] == "ACCEPT":
                    task.status = "COMPLETED"
                else:
                    task.status = "RETRYING"
                    # Add retry logic if needed

                db.commit()

            except Exception as task_err:
                db.add(Log(
                    project_id=project.id,
                    agent="Orchestrator",
                    message=f"TASK {i} FAILED: {str(task_err)}"
                ))
                db.commit()

        project.status = "COMPLETED"
        db.commit()

        db.add(Log(
            project_id=project.id,
            agent="Orchestrator",
            message=f"✅ Project '{project.name}' completed successfully!"
        ))
        db.commit()

    except Exception as e:
        error_msg = f"Orchestrator crashed: {str(e)}"
        db.add(Log(project_id=project.id, agent="CRASH", message=error_msg))
        db.commit()
        project.status = "FAILED"
        db.commit()
        raise e

    return {"status": "completed"}





