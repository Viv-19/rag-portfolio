import os
import chromadb
from chromadb.config import Settings
from chromadb.utils import embedding_functions

# Get the absolute path for the chroma DB directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CHROMA_DB_DIR = os.path.join(BASE_DIR, "chroma_data")

# Using a robust local embedding model
EMBEDDING_MODEL = "BAAI/bge-small-en-v1.5"

def get_chroma_client():
    """Returns a persistent ChromaDB client."""
    client = chromadb.PersistentClient(
        path=CHROMA_DB_DIR,
        settings=Settings(anonymized_telemetry=False)
    )
    return client

def get_embedding_function():
    """Returns the sentence-transformer embedding function."""
    # This will download the model on first run
    return embedding_functions.SentenceTransformerEmbeddingFunction(model_name=EMBEDDING_MODEL)

def get_collection(collection_name: str = "portfolio_collection"):
    """Gets or creates the Chroma collection for portfolio RAG."""
    client = get_chroma_client()
    embedding_func = get_embedding_function()
    
    collection = client.get_or_create_collection(
        name=collection_name,
        embedding_function=embedding_func,
        metadata={"hnsw:space": "cosine"} # Cosine similarity usually works best
    )
    return collection
