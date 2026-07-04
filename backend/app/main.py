from fastapi import FastAPI
from app.api.repository import router as repository_router

app = FastAPI(
    title="CodeForge AI",
    version="1.0.0"
)

app.include_router(repository_router)

@app.get("/")
async def root():
    return {
        "message": "CodeForge AI Backend Running 🚀"
    }