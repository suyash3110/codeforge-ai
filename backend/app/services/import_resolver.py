from pathlib import Path


def module_to_path(module: str) -> str:
    """
    app.services.ai_service
    ->
    app/services/ai_service.py
    """
    return module.replace(".", "/") + ".py"


def resolve_imports(repo_root: str, imports: list[str]) -> list[str]:
    """
    Convert Python import statements into actual repository file paths.
    """

    repo_root = Path(repo_root)

    resolved = []

    for module in imports:

        candidate = repo_root / module_to_path(module)

        if candidate.exists():
            resolved.append(str(candidate.resolve()))

    return resolved