from pathlib import Path

from app.services.repository_service import (
    get_dependencies,
)


def build_architecture_graph():

    dependency_map = get_dependencies()

    nodes = []

    edges = []

    added = set()

    for file_path, imports in dependency_map.items():

        file_name = Path(file_path).name

        if file_name not in added:

            nodes.append(
                {
                    "id": file_name,
                    "label": file_name,
                }
            )

            added.add(file_name)

        for module in imports:

            target = module.split(".")[-1] + ".py"

            if target not in added:

                nodes.append(
                    {
                        "id": target,
                        "label": target,
                    }
                )

                added.add(target)

            edges.append(
                {
                    "source": file_name,
                    "target": target,
                }
            )

    return {
        "nodes": nodes,
        "edges": edges,
    }