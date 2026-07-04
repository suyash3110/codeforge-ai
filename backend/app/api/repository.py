from fastapi import APIRouter, HTTPException

from app.schemas.repository import RepositoryRequest
from app.services.git_service import clone_repository
from app.parser.repository_parser import parse_repository
from app.parser.repository_analyzer import analyze_repository
from app.chunker.code_chunker import chunk_repository
from app.vectorstore.chroma_service import store_chunks

router = APIRouter()


@router.post("/analyze")
async def analyze_repository_api(request: RepositoryRequest):

    try:

        # Clone repository
        repo_path = clone_repository(request.github_url)

        # Parse repository
        files = parse_repository(repo_path)

        # Analyze repository
        summary = analyze_repository(repo_path, files)

        # Chunk files
        chunks = chunk_repository(files)

        # Store chunks in ChromaDB
        store_chunks(chunks)

        return {
            "summary": summary,
            "total_chunks": len(chunks),
            "message": "Repository indexed successfully"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))