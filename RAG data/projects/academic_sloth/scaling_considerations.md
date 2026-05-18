# Scaling Considerations

This document outlines the scalability considerations, infrastructure planning, bottlenecks, and future architectural improvements for Academic Sloth.

The system was intentionally designed with modularity and future scalability in mind, even during early development stages.

---

# 1. Service Separation for Independent Scaling

## Current Architecture

Academic Sloth separates:
- frontend
- backend orchestration
- AI processing

into independent services.

This architecture allows each component to scale independently based on workload characteristics.

---

## Why This Matters

Traditional backend workloads and AI workloads scale differently.

### Backend Workloads
Mostly:
- authentication
- CRUD operations
- lightweight API requests
- metadata queries

### AI Workloads
Mostly:
- embedding generation
- vector retrieval
- cross-encoder re-ranking
- LLM inference

AI services are significantly more CPU and memory intensive.

Separating services prevents:
- backend starvation
- request bottlenecks
- unstable user experiences

---

# 2. Horizontal Scaling Strategy

## Backend Scaling

The Node.js backend can be horizontally scaled behind a load balancer because it is largely stateless.

### Scaling Plan
- multiple EC2 containers/instances
- load balancing via ALB
- shared PostgreSQL database
- centralized session validation using JWT

---

## AI Service Scaling

The Python AI service can scale independently using:
- multiple inference workers
- distributed embedding workers
- queue-based ingestion pipelines

Potential future improvements:
- Kubernetes
- ECS
- autoscaling GPU nodes

---

# 3. Database Scaling Considerations

## PostgreSQL

The current PostgreSQL setup is sufficient for moderate-scale workloads.

However, as user traffic increases:
- indexing
- query optimization
- connection pooling
- read replicas

may become necessary.

---

## Future Improvements

Potential upgrades:
- PostgreSQL read replicas
- Redis caching layer
- query optimization
- partitioning strategies

---

# 4. Vector Database Scaling

## Current Setup

The system currently uses:
```text
ChromaDB
```

with local persistent storage.

This setup works well for:
- development
- medium-scale deployments
- experimentation

---

## Scaling Limitations

As document volume increases:
- retrieval latency increases
- storage management becomes harder
- concurrency handling becomes more difficult

---

## Future Migration Strategy

The architecture allows migration to:
- Pinecone
- Weaviate
- Qdrant
- OpenSearch Serverless

without major application redesign.

---

# 5. Embedding Generation Scaling

## Current Approach

Embeddings are generated locally using:
```text
BAAI/bge-small-en-v1.5
```

on CPU infrastructure.

---

## Advantages

- zero API cost
- no rate limits
- local execution
- predictable latency

---

## Scaling Bottlenecks

Large-scale ingestion may create:
- CPU bottlenecks
- embedding queue delays
- slower ingestion throughput

---

## Future Improvements

Potential optimizations:
- GPU embedding servers
- asynchronous worker queues
- batched embedding generation
- distributed ingestion workers

---

# 6. AI Inference Scaling

## Current Design

The system currently uses:
- Groq API
- rotating API keys
- fallback models

to improve inference availability.

---

## Bottlenecks

Potential scaling issues:
- API rate limits
- inference latency
- external dependency reliability

---

## Future Scaling Strategy

Future architecture could include:
- dedicated GPU inference servers
- vLLM deployment
- local quantized models
- model routing systems
- inference caching

---

# 7. Asynchronous Processing Architecture

One important scalability decision was implementing asynchronous ingestion.

---

## Why Async Matters

PDF ingestion involves:
- parsing
- chunking
- embeddings
- vector insertion

These operations are computationally expensive.

Running them synchronously would:
- block API requests
- reduce responsiveness
- increase timeout risk

---

## Future Improvements

Potential scaling upgrades:
- RabbitMQ
- Kafka
- Celery workers
- distributed task queues

---

# 8. Streaming Response Architecture

The system uses:
```text
Server-Sent Events (SSE)
```

for response streaming.

---

## Benefits

Streaming:
- reduces perceived latency
- improves UX
- reduces blocking behavior
- supports long AI generations

---

## Future Considerations

For very large-scale real-time systems:
- WebSockets
- event brokers
- streaming gateways

may become more appropriate.

---

# 9. Storage Scaling

## Current Storage

PDFs are stored in:
```text
Amazon S3
```

which already supports high scalability and durability.

---

## Advantages

S3 provides:
- virtually unlimited storage
- object durability
- easy retrieval
- secure access using pre-signed URLs

This removes dependency on local filesystem scaling.

---

# 10. Security Scaling

As systems scale, security complexity also increases.

Future improvements may include:
- rate limiting
- API gateway protection
- WAF integration
- RBAC systems
- audit logging
- intrusion monitoring
- OAuth providers

---

# 11. Observability & Monitoring

Monitoring becomes critical at scale.

---

## Current Monitoring

The system currently uses:
- CloudWatch
- logs
- service monitoring

---

## Future Improvements

Potential observability stack:
- Prometheus
- Grafana
- distributed tracing
- centralized logging
- alert pipelines

---

# 12. Cost Optimization Strategy

One major engineering goal was reducing unnecessary AI infrastructure cost.

---

## Current Optimizations

Implemented:
- local embeddings
- CPU inference
- ChromaDB local persistence
- lightweight frontend
- efficient retrieval pipeline

---

## Philosophy

The architecture prioritizes:
- practical scalability
- controlled operational cost
- efficient resource usage

instead of over-engineering infrastructure too early.

---

# 13. Long-Term Architecture Vision

The long-term vision for Academic Sloth includes:
- distributed AI services
- scalable vector infrastructure
- GPU-based inference
- multi-document collaborative analysis
- agentic research workflows
- cloud-native orchestration
- production-grade monitoring
- enterprise-ready deployment

---

# Engineering Perspective

The system was designed not only to function correctly at small scale, but also to evolve into a larger production-ready AI platform.

The architecture intentionally emphasizes:
- modularity
- service isolation
- scalability
- maintainability
- operational efficiency
- production-oriented AI engineering