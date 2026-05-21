FROM python:3.11-slim

# Install system dependencies (build-essential is required for compiling some ChromaDB dependencies like hnswlib)
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set up a working directory
WORKDIR /app

# Create cache directory for Hugging Face models and ensure it's writeable
ENV HF_HOME=/app/hf_cache
RUN mkdir -p /app/hf_cache && chmod -R 777 /app/hf_cache

# Copy requirements and install
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Pre-download the sentence-transformers embedding model during Docker build
# This avoids downloading it on container startup, making the boot process instant
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('BAAI/bge-small-en-v1.5')"

# Copy backend files and RAG data
COPY backend ./backend/
COPY "RAG data" "./RAG data"

# Make sure all files in /app are writeable by the HF Space user (user 1000)
RUN chmod -R 777 /app

# Set the working directory to the backend folder so relative paths resolve correctly
WORKDIR /app/backend

# Expose port 7860 (Hugging Face Spaces default port)
EXPOSE 7860

# Run uvicorn on port 7860 and bind to all interfaces
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
