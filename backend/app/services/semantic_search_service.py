from app.vectorstore.chroma_service import search_chunks


def semantic_search(query: str):

    context = search_chunks(
        question=query,
        n_results=8,
    )

    return {
        "query": query,
        "results": context,
    }