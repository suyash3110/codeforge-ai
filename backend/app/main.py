from fastapi import FastAPI
from app.api.repository import router as repository_router

app = FastAPI(
    title="CodeForge AI",
    debug=True
)

app.include_router(repository_router)


@app.get("/")
def root():
    return {
        "message": "CodeForge AI Backend Running"
    }