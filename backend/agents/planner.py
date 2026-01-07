# agents/planner.py
from llm.groq_client import call_groq

class PlannerAgent:
    def plan(self, goal: str):
        prompt = f"""
You are a senior AI project planner.

Break the following goal into a clear, ordered list of tasks.

Goal:
{goal}

Rules:
- Return tasks as a numbered list
- Keep tasks concise
"""

        output = call_groq(prompt)

        tasks = []
        for line in output.split("\n"):
            line = line.strip()
            if line and line[0].isdigit():
                task = line.split(".", 1)[1].strip() if "." in line else line
                tasks.append(task)

        return tasks
