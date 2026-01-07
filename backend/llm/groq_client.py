import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise RuntimeError("GROQ_API_KEY not found in environment")

client = Groq(api_key=api_key)

MODEL_NAME = "llama-3.3-70b-versatile"

def call_groq(prompt: str) -> str:
    """
    Centralized Groq LLM call
    """
    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful, precise AI agent."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,
            max_tokens=800
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        # Never crash the orchestrator
        return f"[LLM_ERROR] {str(e)}"
