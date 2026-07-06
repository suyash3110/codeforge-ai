from pathlib import Path

from fastapi import APIRouter, HTTPException, Query

from app.schemas.repository import RepositoryRequest

from app.services.repository_service import (
    analyze,
    get_tree,
    get_files,
    get_dependencies,
    get_symbols,
    get_call_graph,
)

from app.services.architecture_graph_service import (
    build_architecture_graph,
)

router = APIRouter()


@router.post("/analyze")
async def analyze_repository(request: RepositoryRequest):

    try:

        return analyze(request.github_url)

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.get("/tree")
async def repository_tree():

    return {
        "tree": get_tree()
    }


@router.get("/files")
async def repository_files():

    files = get_files()

    return {
        "files": [
            {
                "name": file["name"],
                "path": file["path"],
                "extension": file["extension"],
                "size": file["size"],
            }
            for file in files
        ]
    }


@router.get("/dependencies")
async def repository_dependencies():

    return {
        "dependencies": get_dependencies()
    }


@router.get("/symbols")
async def repository_symbols():

    return {
        "symbols": get_symbols()
    }


@router.get("/call-graph")
async def repository_call_graph():

    return {
        "call_graph": get_call_graph()
    }


@router.get("/architecture-graph")
async def architecture_graph():

    return build_architecture_graph()


@router.get("/file")
async def repository_file(
    path: str = Query(...)
):

    try:

        file_path = Path(path)

        if not file_path.exists():

            raise HTTPException(
                status_code=404,
                detail="File not found",
            )

        content = file_path.read_text(
            encoding="utf-8",
            errors="ignore",
        )

        return {
            "name": file_path.name,
            "path": str(file_path),
            "content": content,
        }

    except HTTPException:

        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )