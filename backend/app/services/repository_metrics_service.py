from collections import Counter


def build_repository_metrics(files, dependencies, symbols, security_report):

    language_counter = Counter()

    total_lines = 0
    total_functions = 0
    total_classes = 0

    for file in files:

        ext = file.get("extension", "")

        language_counter[ext] += 1

        try:
            with open(
                file["path"],
                "r",
                encoding="utf-8",
                errors="ignore",
            ) as f:
                total_lines += len(f.readlines())
        except Exception:
            pass

    for file_symbols in symbols.values():

        total_functions += len(file_symbols.get("functions", []))

        total_classes += len(file_symbols.get("classes", []))

    return {
        "files": len(files),
        "lines_of_code": total_lines,
        "languages": dict(language_counter),
        "dependencies": len(dependencies),
        "functions": total_functions,
        "classes": total_classes,
        "security_issues": sum(
            len(v) for v in security_report.values()
        ),
    }