import os
import shutil
from git import Repo

def clone_repository(github_url: str):
    repo_name = github_url.split("/")[-1]
    repo_path = os.path.join("repositories", repo_name)

    if os.path.exists(repo_path):
        shutil.rmtree(repo_path)

    Repo.clone_from(github_url, repo_path)

    return repo_path