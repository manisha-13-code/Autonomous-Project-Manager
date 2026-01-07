# agents/executor.py
from llm.groq_client import call_groq

class ExecutorAgent:
    def execute(self, task: str):
        prompt = f"""
You are an expert software engineer AI agent.

Execute the following task and explain clearly.

Task:
{task}

Output format:
- Explanation
- Result
"""
        return call_groq(prompt)
