from app.ai.gemini_service import ask_gemini
from app.services.semantic_context_service import build_semantic_context


def _generate(prompt: str):
    return ask_gemini(prompt)


def explain_file(file_path: str, code: str):

    context = build_semantic_context(
        file_path,
        "Explain this file"
    )

    prompt = f"""
You are a Senior Software Engineer.

Use the repository context below.

================ CONTEXT ================

{context}

================ CURRENT FILE ================

{code}

Explain:

1. Purpose
2. Classes
3. Functions
4. Workflow
5. Relationships with other files

Return markdown.
"""

    return _generate(prompt)


def review_file(file_path: str, code: str):

    context = build_semantic_context(
        file_path,
        "Review this code"
    )

    prompt = f"""
You are a Google Staff Software Engineer.

Repository Context

{context}

Current File

{code}

Review the code.

Return ONLY valid JSON.

[
  {{
    "severity":"HIGH",
    "title":"",
    "line":1,
    "description":"",
    "fix":""
  }}
]

Return [] if no issues.
"""

    return _generate(prompt)


def generate_tests(file_path: str, code: str):

    context = build_semantic_context(
        file_path,
        "Generate unit tests"
    )

    prompt = f"""
Repository Context

{context}

Current File

{code}

Generate comprehensive production-ready unit tests.

Return ONLY code.
"""

    return _generate(prompt)


def optimize_code(file_path: str, code: str):

    context = build_semantic_context(
        file_path,
        "Optimize this file"
    )

    prompt = f"""
Repository Context

{context}

Current File

{code}

Optimize this code.

Explain every optimization.

Return markdown.
"""

    return _generate(prompt)