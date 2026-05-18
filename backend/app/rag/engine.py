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
    # Docs from chromadb client direct query return a dictionary with 'documents'
    if isinstance(docs, dict) and "documents" in docs:
        doc_list = docs["documents"][0] if docs["documents"] else []
        return "\n\n".join(doc_list)
    return ""

def get_retriever():
    """Returns a simple retriever function."""
    collection = get_collection()
    
    def retrieve(query: str):
        results = collection.query(
            query_texts=[query],
            n_results=4
        )
        return format_docs(results)
    
    return retrieve

def get_rag_chain():
    """Builds and returns the RAG chain."""
    
    # Initialize the primary LLM (Groq Llama 3)
    llm_primary = ChatGroq(
        api_key=os.getenv("GROQ_API_KEY_1"),
        model_name="llama-3.1-8b-instant", # Fast and capable
        temperature=0.3,
        streaming=True
    )
    
    # Initialize the secondary LLM as fallback
    llm_secondary = ChatGroq(
        api_key=os.getenv("GROQ_API_KEY_2"),
        model_name="llama-3.1-8b-instant", 
        temperature=0.3,
        streaming=True
    )
    
    # LangChain fallback mechanism: if primary fails (e.g. rate limit), use secondary
    llm_with_fallback = llm_primary.with_fallbacks([llm_secondary])
    
    prompt = get_chat_prompt()
    retriever = get_retriever()
    
    # Create the chain
    chain = (
        RunnablePassthrough.assign(
            context=lambda x: retriever(x["question"])
        )
        | prompt
        | llm_with_fallback
        | StrOutputParser()
    )
    
    # Wrap with history
    chain_with_history = RunnableWithMessageHistory(
        chain,
        get_session_history,
        input_messages_key="question",
        history_messages_key="history",
    )
    
    return chain_with_history

async def stream_chat(session_id: str, question: str) -> AsyncGenerator[str, None]:
    """Streams the response from the RAG chain."""
    chain = get_rag_chain()
    
    # The chain.astream method yields chunks
    async for chunk in chain.astream(
        {"question": question},
        config={"configurable": {"session_id": session_id}}
    ):
        yield chunk
