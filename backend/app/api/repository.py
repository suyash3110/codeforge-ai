from fastapi import APIRouter
from app.schemas.repository import RepositoryRequest
from app.services.git_service import clone_repository

router = APIRouter()

@router.post("/analyze")
async def analyze_repository(request: RepositoryRequest):

    path = clone_repository(request.github_url)

    return {
        "status": "success",
        "repository_path": path
    }