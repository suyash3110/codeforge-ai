import ast
from pathlib import Path


class DependencyExtractor(ast.NodeVisitor):
    def __init__(self):
        self.imports = []

    def visit_Import(self, node):
        for alias in node.names:
            self.imports.append(alias.name)

    def visit_ImportFrom(self, node):
        if node.module:
            self.imports.append(node.module)


def extract_python_dependencies(file_path: str):

    try:

        source = Path(file_path).read_text(
            encoding="utf-8",
            errors="ignore",
        )

        tree = ast.parse(source)

        visitor = DependencyExtractor()

        visitor.visit(tree)

        return sorted(list(set(visitor.imports)))

    except Exception:

        return []


def build_dependency_map(files):

    dependency_map = {}

    for file in files:

        if file["extension"] != ".py":
            continue

        dependency_map[file["path"]] = (
            extract_python_dependencies(
                file["path"]
            )
        )

    return dependency_map