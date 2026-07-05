from pathlib import Path

from app.ai.gemini_service import ask_gemini
from app.services.repository_service import (
    get_files,
    get_summary,
)


MAX_FILE_SIZE = 8000


def read_file(path: str):

    try:

        return Path(path).read_text(
            encoding="utf-8",
            errors="ignore",
        )[:MAX_FILE_SIZE]

    except Exception:

        return ""


def review_repository():

    summary = get_summary()

    files = get_files()

    prompt = f"""
You are a Google Staff Software Engineer.

Perform a repository-wide review.

Repository Summary

Repository:
{summary.get("repository")}

Languages:
{summary.get("languages")}

Return markdown using this format.

# Repository Review

## Critical

## High

## Medium

## Low

## Strengths

## Recommendations

"""

    for file in files:

        if file["extension"] not in [
            ".py",
            ".js",
            ".ts",
            ".tsx",
            ".java",
            ".go",
            ".cpp",
        ]:
            continue

        prompt += f"""

=============================

File:

{file["path"]}

Code:

{read_file(file["path"])}

"""

    return ask_gemini(prompt)