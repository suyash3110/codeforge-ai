import chromadb

client = chromadb.PersistentClient(path="database")

collection = client.get_or_create_collection(
    name="repositories"
)


def store_chunks(chunks):

    ids = []
    documents = []
    metadatas = []

    for i, chunk in enumerate(chunks):

        ids.append(str(i))

        documents.append(chunk["content"])

        metadatas.append(
            {
                "file": chunk["file"],
                "path": chunk["path"],
                "extension": chunk["extension"],
                "start_line": chunk["start_line"],
                "end_line": chunk["end_line"],
            }
        )

    try:
        collection.delete(where={})
    except Exception:
        pass

    if ids:
        collection.add(
            ids=ids,
            documents=documents,
            metadatas=metadatas,
        )


def search_chunks(
    question: str,
    n_results: int = 5,
    k: int | None = None,
):

    if k is not None:
        n_results = k

    results = collection.query(
        query_texts=[question],
        n_results=n_results,
    )

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]

    context = []

    for doc, meta in zip(documents, metadatas):

        context.append(
            f"""
FILE: {meta['file']}
PATH: {meta['path']}
LINES: {meta['start_line']} - {meta['end_line']}

{doc}
"""
        )

    return "\n\n".join(context)