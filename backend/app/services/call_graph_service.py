import ast
from pathlib import Path


class CallGraphVisitor(ast.NodeVisitor):

    def __init__(self):
        self.current_function = None
        self.calls = {}

    def visit_FunctionDef(self, node):

        previous = self.current_function

        self.current_function = node.name

        self.calls.setdefault(node.name, [])

        self.generic_visit(node)

        self.current_function = previous

    def visit_AsyncFunctionDef(self, node):

        self.visit_FunctionDef(node)

    def visit_Call(self, node):

        if self.current_function is None:
            return

        if isinstance(node.func, ast.Name):

            self.calls[self.current_function].append(
                node.func.id
            )

        elif isinstance(node.func, ast.Attribute):

            self.calls[self.current_function].append(
                node.func.attr
            )

        self.generic_visit(node)


def build_file_call_graph(path: str):

    try:

        source = Path(path).read_text(
            encoding="utf-8",
            errors="ignore",
        )

        tree = ast.parse(source)

        visitor = CallGraphVisitor()

        visitor.visit(tree)

        return visitor.calls

    except Exception:

        return {}


def build_repository_call_graph(files):

    graph = {}

    for file in files:

        if file["extension"] != ".py":
            continue

        graph[file["path"]] = build_file_call_graph(
            file["path"]
        )

    return graph