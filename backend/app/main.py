import asyncio
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.rag.engine import stream_chat
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Portfolio AI Assistant API")

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your portfolio domain
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
                # Check if client disconnected
                if await request.is_disconnected():
                    break
                # Yield SSE format, replace newlines in chunks to avoid breaking SSE formatting
                # Wait, SSE splits on \n\n. We should handle newlines if chunk contains them?
                # Actually, standard is `data: chunk\n\n`. If chunk has newlines, 
                # we should yield multiple data lines: `data: line1\ndata: line2\n\n`
                # A safer approach for text streaming is just yielding a JSON object per chunk.
                import json
                yield f"data: {json.dumps({'chunk': chunk})}\n\n"
        except Exception as e:
            import json
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
