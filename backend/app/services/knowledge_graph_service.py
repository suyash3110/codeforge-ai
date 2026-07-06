from app.services.repository_service import (
    get_files,
    get_dependencies,
    get_symbols,
    get_call_graph,
)


def build_knowledge_graph():

    graph = {
        "nodes": [],
        "edges": [],
    }

    files = get_files()
    dependencies = get_dependencies()
    symbols = get_symbols()
    call_graph = get_call_graph()

    # ---------- File Nodes ----------

    for file in files:

        graph["nodes"].append(
            {
                "id": file["path"],
                "type": "file",
                "label": file["name"],
            }
        )

    # ---------- Import Edges ----------

    for file, imports in dependencies.items():

        for module in imports:

            graph["edges"].append(
                {
                    "type": "imports",
                    "source": file,
                    "target": module,
                }
            )

    # ---------- Symbol Nodes ----------

    for file, info in symbols.items():

        for cls in info["classes"]:

            graph["nodes"].append(
                {
                    "id": f"{file}:{cls['name']}",
                    "type": "class",
                    "label": cls["name"],
                }
            )

            graph["edges"].append(
                {
                    "type": "defines",
                    "source": file,
                    "target": f"{file}:{cls['name']}",
                }
            )

        for fn in info["functions"]:

            graph["nodes"].append(
                {
                    "id": f"{file}:{fn['name']}",
                    "type": "function",
                    "label": fn["name"],
                }
            )

            graph["edges"].append(
                {
                    "type": "defines",
                    "source": file,
                    "target": f"{file}:{fn['name']}",
                }
            )

    # ---------- Function Calls ----------

    for file, calls in call_graph.items():

        for caller, callees in calls.items():

            for callee in callees:

                graph["edges"].append(
                    {
                        "type": "calls",
                        "source": f"{file}:{caller}",
                        "target": callee,
                    }
                )

    return graph