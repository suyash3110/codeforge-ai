from pathlib import Path


MAX_LINES = 200


def chunk_repository(files):

    chunks = []

    for file in files:

        path = file["path"]

        extension = file["extension"]

        try:

            with open(path, "r", encoding="utf-8") as f:
                lines = f.readlines()

        except Exception:
            continue

        for i in range(0, len(lines), MAX_LINES):

            chunk = "".join(lines[i:i + MAX_LINES])

            chunks.append({

                "file": Path(path).name,

                "path": path,

                "extension": extension,

                "start_line": i + 1,

                "end_line": min(i + MAX_LINES, len(lines)),

                "content": chunk

            })

    return chunks