from app.services.context_service import build_context
from app.vectorstore.chroma_service import search_chunks


MAX_CHUNKS = 5


def build_semantic_context(
    file_path: str,
    question: str,
) -> str:

    base_context = build_context(file_path)

    relevant_chunks = search_chunks(
        question,
        k=MAX_CHUNKS,
    )

    context = [
        base_context,
        "\n================ RELEVANT CODE ================\n",
    ]

    for chunk in relevant_chunks:

        if isinstance(chunk, dict):

            code = chunk.get("content", "")

        else:

            code = str(chunk)

        context.append(code)

        context.append("\n")

    return "\n".join(context)