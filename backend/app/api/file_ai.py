from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.ai_service import (
    explain_file,
    review_file,
    generate_tests,
    optimize_code,
)

router = APIRouter()


class FileRequest(BaseModel):
    file_name: str
    code: str


@router.post("/explain")
async def explain(request: FileRequest):

    try:

        return {
            "answer": explain_file(
                request.file_name,
                request.code,
            )
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/review")
async def review(request: FileRequest):

    try:

        return {
            "answer": review_file(
                request.file_name,
                request.code,
            )
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/tests")
async def tests(request: FileRequest):

    try:

        return {
            "answer": generate_tests(
                request.file_name,
                request.code,
            )
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/optimize")
async def optimize(request: FileRequest):

    try:

        return {
            "answer": optimize_code(
                request.file_name,
                request.code,
            )
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )