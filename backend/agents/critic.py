

# agents/critic.py
from llm.groq_client import call_groq
import json

class CriticAgent:
    def review(self, output: str):
        prompt = f"""
You are a strict AI code reviewer.

Review the following output and decide:
- ACCEPT if correct
- RETRY if incomplete or incorrect

Respond ONLY in valid JSON:

{{
  "decision": "ACCEPT or RETRY",
  "reason": "short reason"
}}

Output:
{output}
"""
        try:
            return json.loads(call_groq(prompt))
        except:
            return {"decision": "RETRY", "reason": "Invalid JSON from LLM"}
