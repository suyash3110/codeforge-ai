from pathlib import Path

from app.services.git_service import clone_repository
from app.services.dependency_service import build_dependency_map
from app.services.repository_index import repository_index
from app.services.symbol_index_service import build_symbol_index
from app.services.call_graph_service import build_repository_call_graph
from app.services.security_scanner_service import scan_repository
from app.services.semantic_search_service import semantic_search
from app.services.repository_metrics_service import (
    build_repository_metrics,
)

from app.parser.repository_parser import parse_repository
from app.parser.repository_analyzer import analyze_repository

from app.chunker.code_chunker import chunk_repository
from app.vectorstore.chroma_service import store_chunks

from app.utils.tree_builder import build_tree


_metrics = {}


def analyze(github_url: str):

    global _metrics

    repo_path = clone_repository(github_url)

    files = parse_repository(repo_path)

    summary = analyze_repository(
        repo_path,
        files,
    )

    tree = build_tree(files)

    chunks = chunk_repository(files)

    dependency_map = build_dependency_map(files)

    symbol_index = build_symbol_index(files)

    call_graph = build_repository_call_graph(files)

    security_report = scan_repository(files)

    _metrics = build_repository_metrics(
        files,
        dependency_map,
        symbol_index,
        security_report,
    )

    store_chunks(chunks)

    readme = ""

    root = Path(repo_path)

    for candidate in [
        root / "README.md",
        root / "readme.md",
        root / "README.MD",
    ]:

        if candidate.exists():

            readme = candidate.read_text(
                encoding="utf-8",
                errors="ignore",
            )

            break

    repository_index.load(
        summary=summary,
        tree=tree,
        files=files,
        dependencies=dependency_map,
        symbols=symbol_index,
        call_graph=call_graph,
        security_report=security_report,
        chunks=chunks,
        readme=readme,
        root=str(root),
    )

    return {
        "summary": summary,
        "total_chunks": len(chunks),
        "total_dependencies": len(dependency_map),
        "security_issues": len(security_report),
    }


def search_repository(query: str):
    return semantic_search(query)


def get_repository_metrics():
    return _metrics


def get_summary():
    return repository_index.get_summary()


def get_tree():
    return repository_index.get_tree()


def get_files():
    return repository_index.get_files()


def get_dependencies():
    return repository_index.get_dependencies()


def get_symbols():
    return repository_index.get_symbols()


def get_call_graph():
    return repository_index.get_call_graph()


def get_security_report():
    return repository_index.get_security_report()


def get_chunks():
    return repository_index.get_chunks()


def get_readme():
    return repository_index.get_readme()


def get_root():
    return repository_index.get_root()