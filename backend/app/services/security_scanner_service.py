import ast
from pathlib import Path


class SecurityVisitor(ast.NodeVisitor):

    def __init__(self):

        self.issues = []

    def visit_Assign(self, node):

        for target in node.targets:

            if isinstance(target, ast.Name):

                name = target.id.upper()

                if any(keyword in name for keyword in [
                    "API_KEY",
                    "SECRET",
                    "PASSWORD",
                    "TOKEN",
                ]):

                    self.issues.append(
                        {
                            "severity": "HIGH",
                            "type": "Hardcoded Secret",
                            "line": node.lineno,
                            "message": f"Variable '{target.id}' may contain a secret.",
                        }
                    )

        self.generic_visit(node)

    def visit_Call(self, node):

        if isinstance(node.func, ast.Name):

            if node.func.id in ["eval", "exec"]:

                self.issues.append(
                    {
                        "severity": "HIGH",
                        "type": "Dangerous Function",
                        "line": node.lineno,
                        "message": f"Use of {node.func.id}() detected.",
                    }
                )

        if isinstance(node.func, ast.Attribute):

            if (
                node.func.attr == "run"
                and len(node.args) > 0
            ):

                self.issues.append(
                    {
                        "severity": "MEDIUM",
                        "type": "Subprocess",
                        "line": node.lineno,
                        "message": "subprocess.run() detected. Verify shell=False.",
                    }
                )

        self.generic_visit(node)


def scan_python_file(path: str):

    try:

        source = Path(path).read_text(
            encoding="utf-8",
            errors="ignore",
        )

        tree = ast.parse(source)

        visitor = SecurityVisitor()

        visitor.visit(tree)

        return visitor.issues

    except Exception:

        return []


def scan_repository(files):

    report = {}

    for file in files:

        if file["extension"] != ".py":
            continue

        issues = scan_python_file(file["path"])

        if issues:

            report[file["path"]] = issues

    return report