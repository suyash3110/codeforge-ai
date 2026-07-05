from pathlib import Path

from app.services.repository_service import (
    get_summary,
    get_dependencies,
    get_files,
)

from app.services.import_resolver import resolve_imports


MAX_CONTEXT_CHARS = 18000


def read_file(path: str) -> str:

    try:

        return Path(path).read_text(
            encoding="utf-8",
            errors="ignore",
        )

    except Exception:

        return ""


def repository_root(file_path: str) -> Path:

    current = Path(file_path).resolve()

    while current.parent != current:

        if (
            current / ".git"
        ).exists():

            return current

        current = current.parent

    return Path(file_path).parent


def build_context(file_path: str):

    summary = get_summary()

    dependency_map = get_dependencies()

    imports = dependency_map.get(file_path, [])

    root = repository_root(file_path)

    resolved_files = resolve_imports(
        str(root),
        imports,
    )

    context = []

    context.append(
        f"""
================ REPOSITORY SUMMARY ================

Repository:
{summary.get("repository")}

Total Files:
{summary.get("total_files")}

Languages:
{summary.get("languages")}
"""
    )

    readme = None

    for candidate in [
        root / "README.md",
        root / "readme.md",
        root / "README.MD",
    ]:

        if candidate.exists():

            readme = candidate

            break

    if readme:

        context.append(
            """
================ README ================
"""
        )

        context.append(
            readme.read_text(
                encoding="utf-8",
                errors="ignore",
            )
        )

    context.append(
        """
================ SELECTED FILE ================
"""
    )

    context.append(
        read_file(file_path)
    )

    if resolved_files:

        context.append(
            """
================ IMPORTED FILES ================
"""
        )

        for path in resolved_files:

            context.append(
                f"""

---------- {Path(path).name} ----------

"""
            )

            context.append(
                read_file(path)
            )

    final_context = "\n".join(context)

    if len(final_context) > MAX_CONTEXT_CHARS:

        final_context = final_context[
            :MAX_CONTEXT_CHARS
        ]

    return final_context