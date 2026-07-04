import os

IGNORE_DIRS = {
    ".git",
    "node_modules",
    "__pycache__",
    "venv",
    ".next",
    "dist",
    "build",
}

SUPPORTED_EXTENSIONS = {
    ".py",
    ".js",
    ".ts",
    ".tsx",
    ".cpp",
    ".c",
    ".java",
    ".go",
    ".rs",
    ".html",
    ".css",
    ".md",
    ".json",
}


def parse_repository(repo_path: str):
    files = []

    for root, dirs, filenames in os.walk(repo_path):

        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

        for filename in filenames:

            extension = os.path.splitext(filename)[1]

            if extension not in SUPPORTED_EXTENSIONS and filename != "README":
                continue

            path = os.path.join(root, filename)

            files.append({
                "name": filename,
                "path": path,
                "extension": extension,
                "size": os.path.getsize(path),
            })

    return files