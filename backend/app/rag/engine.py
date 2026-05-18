import os
from typing import AsyncGenerator
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

from app.vectorstore.chroma_client import get_collection, get_embedding_function
from app.prompts.system import get_chat_prompt
from app.memory.manager import get_session_history

# Load environment variables
load_dotenv()

def format_docs(docs):
    """Format Chroma documents into a single string for context."""
    if isinstance(docs, dict) and "documents" in docs:
        doc_list = docs["documents"][0] if docs["documents"] else []
        return "\n\n---\n\n".join(doc_list)
    return ""

# ── Singleton chain + retriever ───────────────────────────────────
_cached_chain = None
_cached_retriever = None

def _build_retriever():
    """Build retriever once, reuse the same collection handle."""
    global _cached_retriever
    if _cached_retriever is not None:
        return _cached_retriever

    collection = get_collection()

    def retrieve(query: str):
        results = collection.query(
            query_texts=[query],
            n_results=8
        )
        return format_docs(results)

    _cached_retriever = retrieve
    return _cached_retriever

def get_rag_chain():
    """Builds and returns the RAG chain (singleton — built once, reused forever)."""
    global _cached_chain
    if _cached_chain is not None:
        return _cached_chain

    llm_primary = ChatGroq(
        api_key=os.getenv("GROQ_API_KEY_1"),
        model_name="llama-3.1-8b-instant",
        temperature=0.1,
        streaming=True
    )

    llm_secondary = ChatGroq(
        api_key=os.getenv("GROQ_API_KEY_2"),
        model_name="llama-3.1-8b-instant",
        temperature=0.1,
        streaming=True
    )

    llm_with_fallback = llm_primary.with_fallbacks([llm_secondary])

    prompt = get_chat_prompt()
    retriever = _build_retriever()

    chain = (
        RunnablePassthrough.assign(
            context=lambda x: retriever(x["question"])
        )
        | prompt
        | llm_with_fallback
        | StrOutputParser()
    )

    chain_with_history = RunnableWithMessageHistory(
        chain,
        get_session_history,
        input_messages_key="question",
        history_messages_key="history",
    )

    _cached_chain = chain_with_history
    return _cached_chain


def warmup():
    """Pre-initialize everything so the first real user query is instant.
    Called once at server startup from the lifespan handler."""
    import time
    start = time.time()

    # 1. Force-load embedding model + collection (triggers model download if needed)
    collection = get_collection()
    print(f"  [warmup] Collection ready ({collection.count()} docs)")

    # 2. Build the full RAG chain (LLM clients, prompt, retriever)
    get_rag_chain()
    print(f"  [warmup] RAG chain built")

    # 3. Fire a throwaway embedding query to warm the embedding model's compute path
    collection.query(query_texts=["warmup"], n_results=1)
    print(f"  [warmup] Embedding model warmed up")

    elapsed = time.time() - start
    print(f"  [warmup] Total warmup completed in {elapsed:.1f}s — first query will be instant!")


async def stream_chat(session_id: str, question: str) -> AsyncGenerator[str, None]:
    """Streams the response from the RAG chain."""
    chain = get_rag_chain()

    async for chunk in chain.astream(
        {"question": question},
        config={"configurable": {"session_id": session_id}}
    ):
        yield chunk
