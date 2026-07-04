from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.repository import router as repository_router
from app.chat.chat import router as chat_router

app = FastAPI(title="CodeForge AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(repository_router)
app.include_router(chat_router)


@app.get("/")
def root():
    return {
        "message": "CodeForge AI Backend Running"
    }