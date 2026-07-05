from pathlib import Path


def build_tree(files):

    root = {}

    for file in files:

        relative_path = Path(file["path"])

        parts = relative_path.parts

        current = root

        for part in parts[:-1]:

            if part not in current:
                current[part] = {}

            current = current[part]

        current[parts[-1]] = file["path"]

    return convert_to_tree(root)


def convert_to_tree(node):

    tree = []

    for key, value in sorted(node.items()):

        if isinstance(value, dict):

            tree.append(
                {
                    "id": key,
                    "name": key,
                    "children": convert_to_tree(value),
                }
            )

        else:

            tree.append(
                {
                    "id": value,
                    "name": Path(value).name,
                    "path": value,
                }
            )

    return tree