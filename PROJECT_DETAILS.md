# Vivesh Kumar Singh — Portfolio & RAG Chatbot

This document provides a comprehensive technical breakdown of the personal portfolio and its embedded AI agent. 

---

## 1. Project Overview

This project is a premium, interactive personal portfolio website designed for **Vivesh Kumar Singh**, a GenAI and Full-Stack Developer. Rather than a static HTML page, this portfolio acts as a living, dynamic system featuring a built-in **RAG-powered AI Assistant**.

The primary objective is to allow recruiters, hiring managers, and visitors to **interact directly with an AI proxy** of Vivesh. Visitors can ask the chatbot questions like, *"Tell me about Vivesh's work on Academic Sloth"*, or *"Why should we hire him?"* and receive contextually accurate, streamed responses in real-time.

---

## 2. Technical Architecture

The project is split into two fully decoupled environments:
- **Frontend**: A Vanilla HTML/CSS/JS single-page application (SPA) with a custom ES-module-based component loading system.
- **Backend**: A Python-based FastAPI server hosting a Retrieval-Augmented Generation (RAG) pipeline backed by ChromaDB and Groq's fast Llama 3.1 inference.

### 2.1 Technology Stack
*   **Frontend**: HTML5, Vanilla CSS3 (Custom Variables, Flexbox, Animations), Vanilla JavaScript (ES Modules).
*   **Backend framework**: FastAPI (Python), Uvicorn.
*   **Vector Database**: ChromaDB (Local SQLite-based persistent storage).
*   **Embeddings**: `BAAI/bge-small-en-v1.5` via `sentence-transformers`.
*   **Large Language Model (LLM)**: Meta Llama 3.1 8B (via Groq API for ultra-low latency).
*   **Orchestration**: LangChain (`langchain-core`, `langchain-groq`, `langchain-text-splitters`).

---

## 3. Frontend Implementation Details

### Modular Component System
Instead of a monolithic `index.html`, the frontend is modularized:
- The `index.html` serves as a bare-bones shell containing `<main id="mount-sections">` and other mount points.
- A JavaScript manifest (`js/config/components.js`) defines the load order.
- `js/modules/componentLoader.js` fetches each `.html` file asynchronously (e.g., `hero.html`, `projects.html`) and injects it into the DOM. This mimics modern frameworks like React without the heavy overhead.

### The Agentic UI
- **Glitch Effects**: Handled by `glitchEffects.js`, this cycles through Vivesh's aliases and skill sets in the hero section using randomized character generation.
- **Scroll Reveal**: Sections fade in beautifully as the user scrolls, driven by `IntersectionObserver`.
- **Chatbot Widget**: A custom floating action button (FAB) in the bottom-right corner that toggles a sleek chat interface. The UI features typewriter effects, glowing accents, and smooth slide-up animations.

---

## 4. Backend RAG Implementation

The core feature of this portfolio is the AI Chatbot, which operates via a backend RAG pipeline.

### Document Ingestion (`loader.py`)
- The portfolio data resides in the `RAG data/` folder as a collection of Markdown files detailing Vivesh’s projects, internships, and engineering philosophies.
- On startup, the system parses these files, splits them into manageable chunks using `RecursiveCharacterTextSplitter`, and stores them in ChromaDB.

### The RAG Engine (`engine.py`)
- **Fast Retrieval**: Queries are embedded using the local BAAI model and matched against the top 8 most relevant document chunks via cosine similarity.
- **Strict Anti-Hallucination Prompting**: The system prompt (`system.py`) strictly commands the AI to answer *only* from the provided context, preventing hallucinated projects or skills.
- **Singleton Caching & Warmup**: The RAG chain, embedding models, and vector connections are initialized entirely at startup (`main.py` lifespan event). A dummy warmup query is fired immediately upon server boot, ensuring the first real user query is lightning fast.
- **Fallback Mechanisms**: The system uses two Groq API keys (`GROQ_API_KEY_1` and `GROQ_API_KEY_2`) configured in LangChain's fallback wrapper to prevent downtime during rate limits.

### SSE Streaming
To create a real-time conversational feel, the backend uses **Server-Sent Events (SSE)**.
- Endpoint: `GET /api/chat/stream?session_id=...&message=...`
- The `astream()` method from LangChain yields response tokens one by one, which are streamed securely to the frontend and appended live to the chat interface.

---

## 5. Security & Deployment

- **API Keys**: Groq keys are stored strictly in `backend/.env` and excluded via `.gitignore`.
- **CORS**: FastAPI's CORS middleware is configured to allow requests from the frontend development server, but can be locked down to the production domain.
- **Stateless/Memory**: Chat history is tracked in-memory per session using `InMemoryChatMessageHistory`, keeping the SQLite database strictly for vector data and preventing cross-user data leakage.

## 6. Future Enhancements

- **PostgreSQL / Redis Chat Memory**: For long-term persistent conversations instead of in-memory caching.
- **Hybrid Search**: Upgrading ChromaDB retrieval to include BM25 keyword matching for better handling of exact project names or specific technologies.
- **Analytics Tracking**: Logging questions asked by recruiters to identify which parts of the portfolio generate the most interest.
