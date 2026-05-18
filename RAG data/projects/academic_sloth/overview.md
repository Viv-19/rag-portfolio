# Academic Sloth

Academic Sloth is an AI-powered research assistant designed to help users interact with academic papers using Retrieval-Augmented Generation (RAG), semantic search, and AI-driven conversational analysis.

The platform enables users to:
- upload and analyze research papers
- perform semantic document search
- chat with PDFs using AI
- receive context-aware answers from academic documents
- stream AI-generated responses in real time

The system was designed using a microservices-inspired architecture with clear separation between the frontend, backend orchestration layer, and AI/RAG engine.

## Core Goals

The primary goals of Academic Sloth are:
- improve research productivity
- simplify interaction with academic papers
- reduce information overload
- provide intelligent document understanding
- create a scalable AI-powered research workflow

## Key Features

### AI-Powered PDF Chat
Users can upload academic PDFs and interact with them conversationally using Retrieval-Augmented Generation (RAG).

### Semantic Search
The platform performs semantic similarity search over research documents to retrieve highly relevant context instead of relying on keyword matching.

### Streaming AI Responses
Responses are streamed token-by-token using Server-Sent Events (SSE), creating a real-time conversational experience.

### Intelligent Retrieval Pipeline
The system uses a dual-stage retrieval architecture:
1. bi-encoder vector retrieval
2. cross-encoder re-ranking

This improves retrieval precision and reduces hallucinations.

### Secure Authentication System
The platform includes:
- JWT-based authentication
- OTP email verification
- secure API routing
- protected user sessions

### Event-Driven Indexing
The ingestion pipeline works asynchronously and automatically updates frontend indexing states without blocking user interactions.

## System Architecture

Academic Sloth follows a decoupled architecture split into three major layers:

### Frontend
- Vanilla JavaScript
- TailwindCSS
- SSE-based streaming UI
- split-view research interface

### Backend (Node.js)
- Express.js API
- authentication and authorization
- PostgreSQL + Prisma ORM
- orchestration layer
- file upload management

### AI Service (Python)
- FastAPI
- ChromaDB
- Sentence Transformers
- local embedding generation
- RAG pipeline
- Groq LLM inference

## Engineering Focus

While building Academic Sloth, the primary engineering focus areas were:
- scalable RAG architecture
- low-cost local embeddings
- retrieval accuracy
- asynchronous ingestion
- resilient AI inference
- production-grade backend design
- streaming AI interactions
- modular system separation

## Technologies Used

### Frontend
- Vanilla JavaScript
- TailwindCSS
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- Multer

### AI Stack
- Python
- FastAPI
- ChromaDB
- Sentence Transformers
- Groq API
- Cross-Encoder Re-ranking
- PyMuPDF

### Cloud & Deployment
- AWS EC2
- AWS RDS
- AWS S3
- GitHub Actions
- Docker
- PM2

## Outcome

Academic Sloth was built as a production-oriented AI system focused on combining:
- backend engineering
- AI infrastructure
- retrieval systems
- scalable architecture
- real-time AI interactions

The project represents a strong combination of modern AI engineering and practical software system design.