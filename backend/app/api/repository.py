from fastapi import APIRouter, HTTPException

from app.schemas.repository import RepositoryRequest
from app.services.git_service import clone_repository
from app.parser.repository_parser import parse_repository

router = APIRouter()


@router.post("/analyze")
async def analyze_repository(request: RepositoryRequest):

    try:
        repo_path = clone_repository(request.github_url)

        files = parse_repository(repo_path)

        return {
            "repository_path": repo_path,
            "total_files": len(files),
            "files": files[:10]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))