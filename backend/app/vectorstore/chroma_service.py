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

        metadatas.append({
            "file": chunk["file"],
            "path": chunk["path"],
            "extension": chunk["extension"],
            "start_line": chunk["start_line"],
            "end_line": chunk["end_line"],
        })

    collection.add(
        ids=ids,
        documents=documents,
        metadatas=metadatas
    )