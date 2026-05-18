# A.P.E.X Architecture

## Architecture Philosophy

A.P.E.X was designed as a:
```text
distributed, event-driven, AI-powered logistics intelligence platform
```

The architecture prioritizes:
- real-time responsiveness
- autonomous decision making
- scalability
- operational resilience
- modularity
- cloud-native deployment

The system separates:
- data ingestion
- ML inference
- routing intelligence
- visualization
- AI reasoning

into independently manageable components.

---

# High-Level System Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                         │
│         React 19 + Vite + deck.gl + Google Maps            │
└──────────────────────────────────────────────────────────────┘
                              │
                     REST + SSE + Firebase
                              │
┌──────────────────────────────────────────────────────────────┐
│                    FASTAPI BACKEND LAYER                    │
│              Cloud Run Autonomous ML Agent                  │
└──────────────────────────────────────────────────────────────┘
          │                    │                    │
          │                    │                    │
          ▼                    ▼                    ▼

┌────────────────┐  ┌────────────────┐  ┌────────────────────┐
│  ML PIPELINE   │  │ ROUTING ENGINE │  │  GEMINI AI LAYER   │
│ XGBoost + RF   │  │ Weighted A*    │  │ Vertex AI + Flash  │
└────────────────┘  └────────────────┘  └────────────────────┘
          │                    │                    │
          └────────────────────┼────────────────────┘
                               │
                               ▼

┌──────────────────────────────────────────────────────────────┐
│                FIREBASE REALTIME DATABASE                   │
│            Shared Real-Time Operational State               │
└──────────────────────────────────────────────────────────────┘
                               │
                               ▼

┌──────────────────────────────────────────────────────────────┐
│               FASTAG TELEMETRY / EVENT STREAM               │
└──────────────────────────────────────────────────────────────┘
```

---

# Core Architectural Principles

## 1. Event-Driven System Design

The system operates using:
```text
continuous event propagation
```

instead of periodic batch execution.

Every disruption, route update, anomaly, or telemetry signal:
- updates system state
- triggers ML inference
- recalculates risk
- propagates alerts
- synchronizes the dashboard

in real time.

---

## 2. Distributed Intelligence

A.P.E.X distributes responsibilities across layers:

| Layer | Responsibility |
|---|---|
| Frontend | Visualization & operational monitoring |
| Backend Agent | Orchestration & routing |
| ML Layer | Prediction & scoring |
| Gemini Layer | AI reasoning & analysis |
| Firebase | Shared operational state |

This improves:
- scalability
- maintainability
- fault isolation
- deployment flexibility

---

## 3. Real-Time Synchronization

The system was architected around:
```text
live operational state synchronization
```

using:
```text
Firebase Realtime Database
```

This allows:
- multiple services to coordinate
- frontend dashboards to update instantly
- AI agents to share live network state
- anomalies to propagate immediately

---

# Frontend Architecture

## Technology Stack

The frontend layer uses:
- React 19
- Vite
- deck.gl
- Google Maps Platform
- Zustand state management

---

# Frontend Responsibilities

The frontend acts as:
```text
a logistics command-and-control dashboard
```

It is responsible for:
- route visualization
- anomaly overlays
- operational monitoring
- live KPI rendering
- alert timelines
- node inspection
- AI insight display

---

# Visualization Architecture

## deck.gl Rendering Pipeline

The map rendering system uses:
```text
Google Maps + deck.gl overlays
```

### Layers Used

| Layer | Purpose |
|---|---|
| ArcLayer | Truck route visualization |
| ScatterplotLayer | Node status rendering |
| IconLayer | Anomaly markers |
| TextLayer | Labels and metrics |

---

## Visualization Logic

### Route Rendering
- Blue arcs → Normal routes
- Red arcs → Rerouted traffic
- Dynamic width → Traffic severity

### Node Rendering
- Green → Healthy node
- Yellow → Delayed node
- Red → Disrupted node

---

# Backend Architecture

## FastAPI Autonomous Agent

The backend was implemented using:
```text
FastAPI on Google Cloud Run
```

The backend acts as:
```text
the operational intelligence orchestrator
```

---

# Backend Responsibilities

The backend manages:
- ML inference
- rerouting decisions
- anomaly processing
- event streaming
- AI orchestration
- Firebase synchronization
- SSE broadcasting

---

# API Architecture

## Core Endpoints

| Endpoint | Purpose |
|---|---|
| `/inject-anomaly` | Trigger disruptions |
| `/predict-delay` | XGBoost inference |
| `/trigger-autonomous-reroute` | Routing execution |
| `/gemini-query` | Natural language AI queries |
| `/gemini-insights` | Predictive AI analysis |
| `/health` | Service health monitoring |

---

# ML Architecture

## ML Pipeline Design

The ML layer combines:
- supervised learning
- risk estimation
- graph routing

inside a unified inference pipeline.

---

# XGBoost Disruption Classifier

## Purpose

Predict:
```text
whether a node is likely to enter a disruption state
```

---

## Features Used

| Feature | Purpose |
|---|---|
| queue_length | Congestion estimation |
| utilization | Bottleneck detection |
| processing_rate | Throughput analysis |
| weather_severity | Environmental disruption |
| hour_of_day | Traffic cycle modeling |
| day_of_week | Temporal traffic patterns |

---

## Output

The model outputs:
```text
disruption probability
```

used by:
- anomaly scoring
- rerouting logic
- AI analysis

---

# Random Forest Risk Scorer

The Random Forest model produces:
```text
continuous operational risk scores
```

These scores influence:
- rerouting priority
- corridor danger estimation
- operational severity ranking

---

# Routing Engine Architecture

## Weighted A* Search

The routing engine uses:
```text
Weighted A* Search
```

implemented using:
```text
NetworkX
```

---

# Routing Inputs

The routing engine considers:
- node utilization
- anomaly severity
- edge weights
- congestion levels
- disruption propagation
- risk scores

---

# Routing Outputs

The engine computes:
- optimal bypass paths
- reroute recommendations
- lowest-risk corridors
- shortest safe path

---

# Graph Architecture

## Highway Network Representation

The highway network is modeled as:
```text
a weighted graph
```

### Graph Components

| Component | Description |
|---|---|
| Nodes | Toll plazas / logistics points |
| Edges | Highway corridors |
| Edge Weights | Cost / congestion / delay |

---

# Real-Time State Architecture

## Firebase RTDB

Firebase acts as:
```text
the shared distributed operational memory
```

---

# Firebase Responsibilities

The database stores:
- node states
- active routes
- anomalies
- alerts
- reroute decisions
- risk scores

---

# Firebase Paths

| Path | Purpose |
|---|---|
| `supply_chain/nodes/*` | Node health |
| `supply_chain/active_routes/*` | Truck route state |
| `supply_chain/anomalies/*` | Active disruptions |
| `supply_chain/alerts/*` | Operational alerts |

---

# AI Architecture

## Gemini 2.5 Flash Integration

Gemini AI was integrated through:
```text
Vertex AI
```

---

# Gemini Responsibilities

The Gemini layer performs:
- disruption analysis
- natural language query understanding
- predictive operational insights
- human-readable explanations
- AI-generated recommendations

---

# Context-Aware AI Reasoning

Gemini prompts are enriched using:
- current graph state
- recent anomaly history
- live node conditions
- risk propagation data

This enables:
```text
real-time operationally-aware AI analysis
```

---

# Event Streaming Architecture

## SSE (Server-Sent Events)

The system uses:
```text
SSE streaming
```

for:
- real-time UI updates
- live alerts
- operational monitoring
- ML pipeline logs

---

# Cascade Failure Architecture

## Motter-Lai Inspired Propagation

The system models:
```text
network cascade failures
```

using:
- utilization redistribution
- weighted propagation
- stress transfer
- decay modeling

---

# Cascade Workflow

```text
Disruption Detected
        ↓
Neighbor Utilization Updated
        ↓
Risk Scores Recalculated
        ↓
XGBoost Reclassification
        ↓
A* Rerouting Triggered
        ↓
Gemini Generates Analysis
```

---

# Cloud Architecture

## Google Cloud Stack

| Service | Usage |
|---|---|
| Cloud Run | FastAPI deployment |
| Firebase RTDB | Real-time state |
| Firebase Hosting | Frontend hosting |
| Vertex AI | Gemini inference |
| Cloud IAM | Authentication |

---

# Deployment Architecture

## Frontend Deployment
```text
Firebase Hosting
```

---

## Backend Deployment
```text
Cloud Run containerized FastAPI service
```

---

## AI Deployment
```text
Vertex AI managed Gemini access
```

---

# Security Architecture

## Authentication & Authorization

The system uses:
- Cloud IAM
- service account authentication
- environment-based secret injection

---

# Security Principles

The architecture avoids:
- exposed API keys
- direct frontend AI access
- client-side secrets

---

# Reliability Engineering

## Fault Isolation

The system isolates:
- frontend failures
- ML failures
- AI failures
- routing failures

to avoid:
```text
single-point catastrophic failure
```

---

# Resilience Strategies

The platform implements:
- cache invalidation
- retry handling
- state synchronization
- event buffering
- anomaly isolation

---

# Performance Characteristics

| Component | Latency |
|---|---|
| XGBoost Inference | <15ms |
| Random Forest Scoring | <10ms |
| A* Routing | <50ms |
| Firebase Sync | <100ms |
| Gemini Analysis | ~4–8s |

---

# Engineering Outcomes

The architecture successfully demonstrates:
- real-time distributed coordination
- AI-assisted operational intelligence
- autonomous rerouting systems
- graph-based logistics reasoning
- scalable cloud-native infrastructure

---

# Key Engineering Learnings

The project provided deep practical experience in:
- distributed systems architecture
- real-time synchronization
- cloud-native AI deployment
- graph-based routing systems
- ML orchestration
- AI-assisted infrastructure systems
- event-driven system design
- operational resilience engineering