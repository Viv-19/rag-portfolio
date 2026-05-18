import os
import chromadb
from chromadb.config import Settings
from chromadb.utils import embedding_functions

# Get the absolute path for the chroma DB directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CHROMA_DB_DIR = os.path.join(BASE_DIR, "chroma_data")

# Using a robust local embedding model
EMBEDDING_MODEL = "BAAI/bge-small-en-v1.5"

# ── Singleton caches ──────────────────────────────────────────────
_chroma_client = None
_embedding_func = None
_collection = None

def get_chroma_client():
    """Returns a persistent ChromaDB client (singleton)."""
    global _chroma_client
    if _chroma_client is None:
        _chroma_client = chromadb.PersistentClient(
            path=CHROMA_DB_DIR,
            settings=Settings(anonymized_telemetry=False)
        )
    return _chroma_client

def get_embedding_function():
    """Returns the sentence-transformer embedding function (singleton — loads model once)."""
    global _embedding_func
    if _embedding_func is None:
        _embedding_func = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name=EMBEDDING_MODEL
        )
    return _embedding_func

def get_collection(collection_name: str = "portfolio_collection"):
    """Gets or creates the Chroma collection for portfolio RAG (singleton)."""
    global _collection
    if _collection is None:
        client = get_chroma_client()
        embedding_func = get_embedding_function()
        _collection = client.get_or_create_collection(
            name=collection_name,
            embedding_function=embedding_func,
            metadata={"hnsw:space": "cosine"}
        )
    return _collection

def reset_collection_cache():
    """Call after ingestion to force re-read on next access."""
    global _collection
    _collection = None
