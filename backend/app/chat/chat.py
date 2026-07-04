from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.vectorstore.chroma_service import search_chunks
from app.ai.gemini_service import ask_gemini

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
async def chat(request: ChatRequest):

    try:

        context = search_chunks(request.question)

        prompt = f"""
You are an expert Software Engineering AI.

Use ONLY the repository context below.

Repository Context:

{context}

Question:

{request.question}

Answer:
"""

        answer = ask_gemini(prompt)

        return {
            "answer": answer
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))