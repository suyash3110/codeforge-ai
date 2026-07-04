from fastapi import APIRouter, HTTPException

from app.schemas.repository import RepositoryRequest
from app.services.git_service import clone_repository
from app.parser.repository_parser import parse_repository
from app.chunker.code_chunker import chunk_repository

router = APIRouter()


@router.post("/analyze")
async def analyze_repository(request: RepositoryRequest):

    try:
        repo_path = clone_repository(request.github_url)

        files = parse_repository(repo_path)

        chunks = chunk_repository(files)

        return {
            "repository_path": repo_path,
            "total_files": len(files),
            "total_chunks": len(chunks),
            "sample_chunk": chunks[0] if chunks else None,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))