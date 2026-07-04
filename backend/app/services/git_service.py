import os

from git import Repo

TEMP_DIR = "temp"


def clone_repository(github_url: str):

    os.makedirs(TEMP_DIR, exist_ok=True)

    repo_name = github_url.rstrip("/").split("/")[-1]

    repo_path = os.path.join(TEMP_DIR, repo_name)

    # Clone only if it doesn't already exist
    if not os.path.exists(repo_path):
        Repo.clone_from(github_url, repo_path)

    return repo_path