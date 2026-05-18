# Engineering Decisions

This document explains the major architectural and engineering decisions made while building Academic Sloth, including the reasoning, tradeoffs, and system-level considerations behind each choice.

---

# 1. Decoupled Backend Architecture

## Decision

Separated the system into:
- Frontend
- Node.js Backend
- Python AI Service

instead of building everything inside a single backend service.

---

## Why This Decision Was Made

AI workloads and traditional backend workloads behave very differently.

The Node.js backend is optimized for:
- authentication
- database orchestration
- API routing
- user management
- request handling

The Python service is optimized for:
- AI inference
- embeddings
- RAG pipelines
- vector operations
- document processing

Keeping them separated provided:
- cleaner architecture
- independent scaling
- easier debugging
- better maintainability
- technology specialization

---

## Tradeoffs

### Advantages
- modular services
- easier future scaling
- AI isolation
- cleaner code organization
- independent deployments

### Disadvantages
- increased orchestration complexity
- inter-service communication overhead
- more deployment management

---

# 2. Choosing Local Embeddings Instead of Cloud APIs

## Decision

Used:
```text
BAAI/bge-small-en-v1.5
```

with local CPU inference instead of OpenAI or cloud embedding APIs.

---

## Why This Decision Was Made

The project required:
- low operational cost
- low latency
- independence from API limits
- local execution
- scalability without embedding cost explosion

Cloud embeddings would introduce:
- recurring cost
- network latency
- API rate limits
- external dependency risk

Local embeddings solved all of these problems.

---

## Tradeoffs

### Advantages
- zero embedding cost
- faster local inference
- no rate limits
- complete control
- offline capability

### Disadvantages
- CPU resource usage
- lower embedding quality compared to very large proprietary models
- local infrastructure responsibility

---

# 3. Dual-Stage Retrieval Architecture

## Decision

Implemented:
1. bi-encoder retrieval
2. cross-encoder re-ranking

instead of relying only on vector similarity search.

---

## Why This Decision Was Made

Basic vector retrieval often returned chunks that were:
- topically related
- semantically similar

but not necessarily:
- logically relevant
- answer-focused

This caused:
- weak context quality
- hallucinations
- inaccurate responses

Cross-encoder re-ranking improved precision significantly.

---

## Retrieval Pipeline

```text
Question
   ↓
Bi-Encoder Retrieval (Top 15)
   ↓
Cross-Encoder Re-Ranking
   ↓
Top 5 Relevant Chunks
   ↓
LLM Generation
```

---

## Tradeoffs

### Advantages
- higher retrieval accuracy
- reduced hallucinations
- improved academic relevance
- stronger answer grounding

### Disadvantages
- increased latency
- additional CPU usage
- more complex retrieval pipeline

---

# 4. Using ChromaDB

## Decision

Selected ChromaDB as the vector database.

---

## Why This Decision Was Made

The project required:
- local vector storage
- easy integration
- lightweight setup
- rapid experimentation
- persistent embeddings

ChromaDB matched these requirements well.

---

## Why Not Pinecone Initially?

Pinecone was intentionally avoided in the early stage because:
- local development speed was prioritized
- cloud dependency was unnecessary initially
- cost optimization mattered
- experimentation flexibility was important

---

## Scaling Consideration

The architecture was designed so ChromaDB could later be replaced with:
- Pinecone
- Weaviate
- OpenSearch
- Qdrant

without major backend redesign.

---

# 5. Event-Driven Ingestion System

## Decision

Implemented asynchronous ingestion instead of synchronous document processing.

---

## Why This Decision Was Made

PDF ingestion is computationally expensive because it involves:
- parsing
- chunking
- embeddings
- vector insertion

Synchronous ingestion caused:
- blocked UI
- poor user experience
- frontend crashes
- timeout issues

The async pipeline solved this.

---

## Result

The frontend now:
- reacts to indexing states
- shows ingestion progress
- prevents invalid chat requests
- maintains responsiveness

---

# 6. Server-Sent Events (SSE) for Streaming

## Decision

Used SSE instead of traditional request-response chat APIs.

---

## Why This Decision Was Made

Streaming responses create:
- lower perceived latency
- better conversational feel
- smoother AI interactions

Users can read responses progressively instead of waiting for the entire generation.

---

## Why SSE Instead of WebSockets?

The system primarily required:
- one-way streaming
- lightweight implementation
- easier backend integration

SSE was simpler and more efficient for this use case.

---

# 7. GroqRotatingClient Architecture

## Decision

Implemented a rotating API key architecture with fallback models.

---

## Why This Decision Was Made

Groq free-tier limits caused:
```text
429 Too Many Requests
```

during heavy usage.

The rotating client improved:
- availability
- reliability
- fault tolerance

---

## Features

The system:
- rotates across API keys
- retries failed requests
- switches fallback models
- prevents complete failure

---

# 8. Backend-for-Frontend (BFF) Pattern

## Decision

The frontend never directly communicates with AI services.

---

## Why This Decision Was Made

The BFF layer provides:
- centralized authentication
- API security
- hidden API keys
- request validation
- monitoring
- orchestration

This architecture significantly improves security and maintainability.

---

# 9. Security-Oriented Design

## Security Decisions

Implemented:
- JWT authentication
- OTP email verification
- secure route protection
- isolated AI services
- backend proxy routing
- protected API access

---

## Philosophy

Security was treated as a core system requirement rather than an afterthought.

The goal was to build:
- stable systems
- secure systems
- production-oriented systems

instead of only creating AI demos.

---

# 10. Engineering Philosophy Behind the Project

Academic Sloth was designed with a strong focus on:
- practical AI engineering
- scalable architecture
- production-ready systems
- low-cost AI infrastructure
- modularity
- maintainability
- real-world usability

The project was not intended to be only a chatbot or demo application.

It was built as a complete AI-powered product architecture combining:
- backend engineering
- RAG systems
- AI infrastructure
- retrieval optimization
- cloud deployment
- streaming systems
- scalable service separation