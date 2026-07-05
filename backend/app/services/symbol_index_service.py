import ast
from pathlib import Path


class SymbolVisitor(ast.NodeVisitor):

    def __init__(self):

        self.classes = []

        self.functions = []

        self.globals = []

    def visit_ClassDef(self, node):

        self.classes.append(
            {
                "name": node.name,
                "line": node.lineno,
            }
        )

        self.generic_visit(node)

    def visit_FunctionDef(self, node):

        self.functions.append(
            {
                "name": node.name,
                "line": node.lineno,
            }
        )

        self.generic_visit(node)

    def visit_Assign(self, node):

        for target in node.targets:

            if isinstance(target, ast.Name):

                self.globals.append(
                    {
                        "name": target.id,
                        "line": node.lineno,
                    }
                )

        self.generic_visit(node)


def index_python_file(path: str):

    try:

        source = Path(path).read_text(
            encoding="utf-8",
            errors="ignore",
        )

        tree = ast.parse(source)

        visitor = SymbolVisitor()

        visitor.visit(tree)

        return {
            "classes": visitor.classes,
            "functions": visitor.functions,
            "globals": visitor.globals,
        }

    except Exception:

        return {
            "classes": [],
            "functions": [],
            "globals": [],
        }


def build_symbol_index(files):

    index = {}

    for file in files:

        if file["extension"] != ".py":

            continue

        index[file["path"]] = index_python_file(
            file["path"]
        )

    return index