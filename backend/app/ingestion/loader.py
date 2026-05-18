import os
import glob
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.vectorstore.chroma_client import get_collection

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PORTFOLIO_ROOT = os.path.dirname(BASE_DIR)
RAG_DATA_DIR = os.path.join(PORTFOLIO_ROOT, "RAG data")

def load_markdown_files(directory: str):
    """Loads all markdown files from a directory and its subdirectories."""
    md_files = []
    # glob pattern for all .md files
    search_pattern = os.path.join(directory, "**", "*.md")
    for file_path in glob.glob(search_pattern, recursive=True):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Extract basic metadata from path
                rel_path = os.path.relpath(file_path, directory)
                parts = rel_path.split(os.sep)
                
                # Simple metadata extraction based on folder structure
                category = parts[0] if len(parts) > 1 else "general"
                project_name = parts[1] if len(parts) > 2 else "none"
                
                md_files.append({
                    "content": content,
                    "metadata": {
                        "source": rel_path,
                        "category": category,
                        "project_name": project_name
                    }
                })
        except Exception as e:
            print(f"Failed to read {file_path}: {e}")
            
    return md_files

def ingest_documents():
    print(f"Starting ingestion from: {RAG_DATA_DIR}")
    if not os.path.exists(RAG_DATA_DIR):
        print(f"Error: Directory not found: {RAG_DATA_DIR}")
        return
        
    documents = load_markdown_files(RAG_DATA_DIR)
    
    if not documents:
        print("No markdown files found!")
        return

    print(f"Found {len(documents)} markdown files.")
    
    # Split text into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=["\n\n", "\n", "(?<=\\. )", " ", ""]
    )
    
    chunks = []
    metadatas = []
    ids = []
    
    doc_id = 0
    for doc in documents:
        splits = text_splitter.split_text(doc["content"])
        for i, split in enumerate(splits):
            chunks.append(split)
            meta = doc["metadata"].copy()
            meta["chunk_index"] = i
            metadatas.append(meta)
            ids.append(f"doc_{doc_id}_chunk_{i}")
        doc_id += 1
        
    print(f"Created {len(chunks)} text chunks. Loading into ChromaDB...")
    
    collection = get_collection()
    
    # ChromaDB accepts lists, but let's batch them
    BATCH_SIZE = 100
    for i in range(0, len(chunks), BATCH_SIZE):
        batch_chunks = chunks[i:i+BATCH_SIZE]
        batch_metadatas = metadatas[i:i+BATCH_SIZE]
        batch_ids = ids[i:i+BATCH_SIZE]
        
        collection.upsert(
            documents=batch_chunks,
            metadatas=batch_metadatas,
            ids=batch_ids
        )
        print(f"Upserted batch {i//BATCH_SIZE + 1}/{(len(chunks)-1)//BATCH_SIZE + 1}")
        
    print("Ingestion complete!")

if __name__ == "__main__":
    ingest_documents()
