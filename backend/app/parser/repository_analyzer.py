from collections import Counter
from pathlib import Path


LANGUAGE_MAP = {
    ".py": "Python",
    ".js": "JavaScript",
    ".ts": "TypeScript",
    ".tsx": "React",
    ".jsx": "React",
    ".cpp": "C++",
    ".c": "C",
    ".java": "Java",
    ".go": "Go",
    ".rs": "Rust",
    ".html": "HTML",
    ".css": "CSS",
    ".json": "JSON",
    ".md": "Markdown",
}


def analyze_repository(repo_path, files):

    language_counter = Counter()

    total_size = 0

    largest_file = None
    largest_size = 0

    readme = False
    license_file = False
    docker = False

    for file in files:

        ext = file["extension"]

        if ext in LANGUAGE_MAP:
            language_counter[LANGUAGE_MAP[ext]] += 1

        total_size += file["size"]

        if file["size"] > largest_size:
            largest_size = file["size"]
            largest_file = Path(file["path"]).name

        name = file["name"].lower()

        if "readme" in name:
            readme = True

        if "license" in name:
            license_file = True

        if name == "dockerfile":
            docker = True

    return {
        "repository": Path(repo_path).name,
        "total_files": len(files),
        "languages": dict(language_counter),
        "largest_file": largest_file,
        "largest_file_size": largest_size,
        "repository_size_bytes": total_size,
        "has_readme": readme,
        "has_license": license_file,
        "has_docker": docker,
    }