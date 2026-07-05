from fastapi import APIRouter, HTTPException

from app.services.repository_review_service import (
    review_repository,
)

router = APIRouter()


@router.post("/repository-review")
async def repository_review():

    try:

        answer = review_repository()

        return {
            "answer": answer
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )