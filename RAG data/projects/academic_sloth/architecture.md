# Academic Sloth Architecture

Academic Sloth follows a decoupled, microservices-inspired architecture designed for scalability, maintainability, security, and AI performance. The system is separated into three independent layers:

1. Frontend Client Layer
2. Backend Orchestration Layer
3. AI/RAG Processing Layer

This separation allows the platform to scale individual services independently while maintaining clean boundaries between product logic and AI processing.

---

# High-Level Architecture

```text
Frontend (SPA)
      ↓
Node.js Backend (BFF / Orchestrator)
      ↓
Python AI Service (RAG Engine)
      ↓
ChromaDB + Groq API + Local Embedding Models
```

---

# Project Structure

```text
Academic Sloth/

├── Sloth_backend/        # Node.js Product Backend
├── Sloth_ai_service/     # Python AI/RAG Engine
├── Sloth_frontend/       # Frontend UI
├── docs/                 # System design docs
├── scripts/              # Development scripts
└── docker/               # Docker configurations
```

---

# 1. Frontend Architecture

The frontend is a lightweight Single-Page Application (SPA) built using Vanilla JavaScript and TailwindCSS.

## Design Goals

The frontend was designed to:
- remain lightweight and fast
- support real-time AI streaming
- provide smooth document interaction
- avoid unnecessary frontend complexity

## Core Features

### Event-Driven UI

The UI reacts dynamically to indexing events and ingestion states.

Example:
- if a PDF is still processing
- frontend automatically updates UI state
- user receives live indexing feedback

This avoids blocking interactions.

---

### Streaming AI Responses

The frontend consumes Server-Sent Events (SSE) using the `EventSource` API.

This enables:
- token-by-token response streaming
- real-time conversational experience
- reduced perceived latency

Instead of waiting for the full response, users see answers generated progressively.

---

### Split-View Research Interface

The system embeds:
- PDF viewer
- AI chat interface

side-by-side to create an interactive research workflow.

Users can:
- read papers
- ask questions
- inspect citations
- analyze content simultaneously

---

# 2. Backend Architecture (Node.js / Express)

The Node.js backend acts as the primary orchestration layer and Backend-for-Frontend (BFF).

Its main responsibility is:
- authentication
- orchestration
- database management
- secure API routing
- communication between frontend and AI services

---

## Authentication & Authorization

The backend handles:
- account creation
- OTP email verification
- JWT authentication
- protected routes

Security was prioritized to ensure:
- isolated user sessions
- secure document ownership
- safe API access

---

## Database Management

The backend uses:
- PostgreSQL
- Prisma ORM

to manage:
- users
- uploaded documents
- ingestion states
- chat history
- metadata

Prisma was selected because of:
- type-safe queries
- migration support
- maintainability
- developer productivity

---

## Proxy Orchestration Layer

The frontend never directly communicates with the AI service.

Instead:

```text
Frontend → Node.js → Python AI Service
```

Benefits:
- API keys remain hidden
- AI services stay isolated
- centralized authentication
- improved security
- easier request monitoring

This architecture also allows future scaling of AI services independently.

---

## File Upload Pipeline

PDF uploads are handled using Multer middleware.

Flow:
1. User uploads PDF
2. Node.js validates request
3. Metadata stored in PostgreSQL
4. File stored securely
5. Background ingestion triggered

This ensures:
- non-blocking uploads
- stable ingestion pipeline
- async processing

---

# 3. AI Service Architecture (Python / FastAPI)

The Python service performs all:
- RAG operations
- embeddings
- retrieval
- re-ranking
- LLM orchestration
- document analysis

The service was intentionally isolated from the main backend because AI workloads are CPU-intensive and scale differently.

---

# Ingestion Pipeline

The ingestion pipeline processes PDFs asynchronously.

## Pipeline Flow

```text
PDF
 ↓
PyMuPDF Extraction
 ↓
Text Cleaning
 ↓
Chunking
 ↓
Embedding Generation
 ↓
Vector Storage
```

---

## Idempotent Processing

The ingestion system checks the vector database before processing.

This prevents:
- duplicate embeddings
- unnecessary computation
- repeated ingestion costs

---

# Embedding Architecture

Academic Sloth uses local embedding generation instead of cloud embedding APIs.

## Embedding Model

```text
BAAI/bge-small-en-v1.5
```

using:

```text
sentence-transformers
```

---

## Why Local Embeddings?

Local embeddings provide:
- zero API cost
- low latency
- no rate limits
- full control
- CPU execution

This architecture significantly reduced operational cost.

---

# Vector Database

The system uses:

```text
ChromaDB
```

for:
- persistent vector storage
- semantic similarity search
- fast retrieval

ChromaDB was selected because:
- lightweight setup
- local persistence
- easy Python integration
- suitable for mid-scale RAG systems

---

# Dual-Stage Retrieval Pipeline

One of the most important architectural decisions was implementing a dual-stage retrieval pipeline.

---

## Stage 1 — Bi-Encoder Retrieval

The embedding model retrieves:

```text
Top 15 candidate chunks
```

using vector similarity search.

This stage is optimized for speed.

---

## Stage 2 — Cross-Encoder Re-Ranking

The retrieved chunks are re-ranked using:

```text
cross-encoder/ms-marco-MiniLM-L-6-v2
```

This model evaluates:

```text
Question + Chunk
```

pairs for deeper semantic relevance.

Final output:

```text
Top 5 highly relevant chunks
```

Benefits:
- improved retrieval precision
- fewer hallucinations
- better academic relevance

---

# LLM Inference Architecture

Academic Sloth uses Groq for high-speed inference.

## Primary Model

```text
llama-3.3-70b-versatile
```

## Fallback Model

```text
llama-3.1-8b-instant
```

---

# Resilient API Routing

A custom:

```text
GroqRotatingClient
```

was implemented.

Features:
- rotates across multiple API keys
- retries automatically
- handles 429 rate limits
- fallback model switching
- graceful degradation

This improved system stability significantly.

---

# Communication Flow

## Upload Flow

```text
User Upload
    ↓
Node.js stores metadata
    ↓
PDF saved
    ↓
Background ingestion request
    ↓
Python processes document
    ↓
Vector DB updated
```

---

## Chat Flow

```text
User Question
    ↓
Node.js validates JWT
    ↓
Request forwarded to Python
    ↓
RAG pipeline executes
    ↓
LLM response streamed back
    ↓
Frontend renders response
```

---

# Deployment Architecture

The production deployment is designed for AWS.

## Infrastructure Components

### Compute
- EC2 instances
- isolated AI compute node
- separate backend node

### Database
- Amazon RDS PostgreSQL

### Storage
- Amazon S3

### Load Balancing
- Application Load Balancer

### CI/CD
- GitHub Actions
- PM2
- systemd
- Docker

---

# Engineering Priorities

The architecture was designed with focus on:
- modularity
- scalability
- maintainability
- low-cost AI execution
- security
- async processing
- resilient inference
- production readiness

---

# Key Engineering Learnings

Building Academic Sloth provided deep practical experience in:
- production RAG systems
- AI orchestration
- backend architecture
- streaming AI systems
- async workflows
- vector databases
- retrieval optimization
- AI deployment pipelines
- cloud infrastructure