import asyncio
import json
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.rag.engine import stream_chat, warmup
from app.vectorstore.chroma_client import get_collection, reset_collection_cache
from app.ingestion.loader import ingest_documents
from dotenv import load_dotenv

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: auto-ingest if needed, then warmup all heavy components."""
    print("[startup] Initializing Portfolio AI Assistant...")

    # Step 1 — Ensure documents are ingested
    collection = get_collection()
    if collection.count() == 0:
        print("[startup] ChromaDB is empty — running auto-ingestion...")
        ingest_documents()
        reset_collection_cache()  # force re-read after ingestion
        collection = get_collection()
        print(f"[startup] Ingestion complete. {collection.count()} documents loaded.")
    else:
        print(f"[startup] ChromaDB has {collection.count()} documents. Skipping ingestion.")

    # Step 2 — Warmup: pre-load embedding model, build chain, fire throwaway query
    print("[startup] Running warmup sequence...")
    warmup()
    print("[startup] ✓ Server is HOT — first user query will be instant!")

    yield

app = FastAPI(title="Portfolio AI Assistant API", lifespan=lifespan)

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your portfolio domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    session_id: str
    message: str

@app.get("/")
def read_root():
    return {"status": "AI Assistant Backend is running."}

@app.get("/api/chat/stream")
async def chat_stream(session_id: str, message: str, request: Request):
    """
    SSE endpoint for streaming chat responses.
    Usage: GET /api/chat/stream?session_id=123&message=Hello
    """
    async def event_generator():
        try:
            async for chunk in stream_chat(session_id, message):
                if await request.is_disconnected():
                    break
                yield f"data: {json.dumps({'chunk': chunk})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
        finally:
            yield "event: done\ndata: [DONE]\n\n"
            
    return StreamingResponse(event_generator(), media_type="text/event-stream")

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """
    Standard synchronous chat endpoint.
    """
    response_text = ""
    async for chunk in stream_chat(request.session_id, request.message):
        response_text += chunk
        
    return {"reply": response_text}
