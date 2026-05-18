# Sentinel-Graph Architecture

## Architecture Philosophy

Sentinel-Graph was designed as a:
```text
stateful multi-agent AI orchestration platform
```

focused on:
- structured reasoning
- resilient execution
- modular orchestration
- Human-in-the-Loop workflows
- state persistence
- specialized agent decomposition

The system intentionally avoids:
- monolithic prompting
- stateless execution chains
- uncontrolled autonomous generation

Instead, the platform models AI workflows as:
```text
graph-based state machines
```

using:
```text
LangGraph
```

to enable:
- parallel reasoning
- checkpoint recovery
- deterministic orchestration
- interruptible execution
- controlled state propagation

---

# High-Level System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND IDE LAYER                      │
│        React 18 + Monaco Editor + Tailwind CSS             │
└─────────────────────────────────────────────────────────────┘
                              │
                        HTTP / JSON
                              │
┌─────────────────────────────────────────────────────────────┐
│                 NODE.JS API GATEWAY                        │
│     Express + TypeScript + Hexagonal Architecture          │
└─────────────────────────────────────────────────────────────┘
                              │
                         HTTP POST
                              │
┌─────────────────────────────────────────────────────────────┐
│                 PYTHON AI EXECUTION LAYER                  │
│           FastAPI + LangGraph + Pydantic                   │
└─────────────────────────────────────────────────────────────┘
          │                    │                    │
          ▼                    ▼                    ▼

┌────────────────┐  ┌────────────────┐  ┌────────────────────┐
│ Problem Graph  │  │ Review Graph   │  │ Checkpoint Memory  │
│ 6-Agent Flow   │  │ 3-Agent Flow   │  │ MemorySaver        │
└────────────────┘  └────────────────┘  └────────────────────┘
          │                    │                    │
          └────────────────────┼────────────────────┘
                               │
                               ▼

┌─────────────────────────────────────────────────────────────┐
│                     GROQ LLM LAYER                         │
│              llama-3.1-8b-instant via API                  │
└─────────────────────────────────────────────────────────────┘
```

---

# Core Architectural Principles

## 1. Graph-Based AI Orchestration

The entire platform operates as:
```text
a graph execution engine
```

instead of sequential prompt chains.

This enables:
- branching execution
- conditional routing
- parallel agents
- fan-in aggregation
- checkpoint recovery
- execution resumption

---

## 2. Specialized Agent Decomposition

Rather than relying on one generalized agent, Sentinel-Graph decomposes reasoning into:
```text
small focused expert agents
```

Each agent handles:
- a single reasoning domain
- isolated responsibilities
- constrained prompts
- targeted outputs

This architecture improves:
- consistency
- hallucination resistance
- reasoning quality
- token efficiency

---

## 3. Shared Stateful Memory

All agents interact through:
```text
CodeReviewState
```

which acts as:
```text
the shared operational memory of the graph
```

This enables:
- context propagation
- thread persistence
- state synchronization
- reasoning continuity

---

# Frontend Architecture

## Technology Stack

The frontend layer uses:
- React 18
- Monaco Editor
- Tailwind CSS
- EJS Templates

---

# Frontend Responsibilities

The frontend acts as:
```text
an AI-powered interactive engineering workspace
```

The UI is responsible for:
- code editing
- graph execution monitoring
- displaying findings
- rendering diffs
- handling approvals
- managing user workflows

---

# Monaco Editor Integration

The editor uses:
```text
Monaco Editor
```

(the same core engine used in VS Code).

---

## Editor Features

The editor supports:
- syntax highlighting
- auto indentation
- language-aware rendering
- inline editing
- diff visualization
- AI-generated code injection

---

# Frontend Visualization Components

## Operational Tabs

The UI contains:
- Problem Analysis
- Logs
- Findings
- Diff Viewer
- Refactor Preview

---

## Live Execution Monitor

The frontend visualizes:
- graph execution order
- agent activation
- elapsed timings
- workflow progress
- interruption boundaries

---

# Backend Gateway Architecture

## Technology Stack

The API gateway uses:
- Node.js
- Express
- TypeScript
- Zod Validation

---

# Hexagonal Architecture

The backend follows:
```text
Ports & Adapters Architecture
```

to decouple:
- business logic
- routing
- infrastructure
- AI services

---

# Hexagonal Layers

```text
HTTP Routes
      ↓
Ports (Interfaces)
      ↓
Application Core
      ↓
Adapters
      ↓
FastAPI / Diff Engines
```

---

# Core Backend Responsibilities

The gateway handles:
- request validation
- session orchestration
- diff generation
- thread management
- API abstraction
- FastAPI communication

---

# Validation Layer

The backend uses:
```text
Zod schemas
```

to validate:
- session requests
- review payloads
- code submissions
- graph actions

before requests enter the AI engine.

---

# Python AI Engine Architecture

## Technology Stack

The AI layer uses:
- Python 3.10+
- FastAPI
- LangGraph
- Pydantic
- ChatGroq

---

# AI Layer Responsibilities

The AI engine manages:
- graph execution
- agent orchestration
- state transitions
- checkpoint persistence
- parallel reasoning
- HITL workflows

---

# LangGraph State Machine

## Unified State Model

All workflows operate using:
```python
CodeReviewState
```

which contains:
- problem analysis
- complexity estimates
- findings
- strategy plans
- approved suggestions
- final code

---

# State Reducers

LangGraph reducers use:
```python
Annotated[list, operator.add]
```

to safely merge:
- findings
- messages
- parallel outputs

during concurrent execution.

---

# Why Reducers Matter

Without reducers:
- parallel writes overwrite each other
- race conditions occur
- findings become inconsistent

Reducers guarantee:
```text
thread-safe parallel aggregation
```

across agents.

---

# Problem Analysis Graph

## Workflow Structure

The problem-solving pipeline consists of:

| Agent | Responsibility |
|---|---|
| ProblemAnalyzer | Extract constraints & formats |
| ConstraintAnalyzer | Infer scalability limits |
| ComplexityEstimator | Predict target complexity |
| PatternRecognizer | Detect algorithm class |
| StrategyPlanner | Build algorithm strategy |
| TestCaseValidator | Simulate & validate |

---

# Pipeline Flow

```text
Problem Input
      ↓
ProblemAnalyzer
      ↓
Parallel Analysis Agents
      ↓
StrategyPlanner
      ↓
TestCaseValidator
      ↓
HITL Decision Gate
```

---

# Parallel Fan-Out Architecture

The graph executes:
- ConstraintAnalyzer
- ComplexityEstimator
- PatternRecognizer

simultaneously.

This reduces:
- overall latency
- sequential bottlenecks

while improving:
- reasoning specialization

---

# Code Review Graph

## Review Agents

The review workflow includes:

| Agent | Responsibility |
|---|---|
| BugHunter | Runtime & logical errors |
| StyleGuard | Readability & conventions |
| PerfArchitect | Complexity inefficiencies |
| Synthesizer | Deduplication & ranking |
| RefactorAI | Targeted rewrites |

---

# Parallel Review Architecture

The Router node:
1. detects language
2. fans out review agents
3. aggregates findings

using:
```text
parallel execution + fan-in synthesis
```

---

# Deduplication Architecture

The Synthesizer uses:
```text
Jaccard Similarity
```

to merge overlapping findings.

---

## Similarity Formula

:contentReference[oaicite:0]{index=0}

If similarity exceeds threshold:
- findings are merged
- highest severity retained
- contributing agents recorded

---

# Memory & Checkpoint Architecture

## MemorySaver Checkpoints

The system uses:
```python
MemorySaver()
```

to persist:
- graph state
- thread execution
- interrupt positions
- approved suggestions

---

# Thread Persistence

Each session is assigned:
```text
thread_id
```

which enables:
- execution resumption
- state recovery
- HITL continuity

across HTTP requests.

---

# Human-in-the-Loop Architecture

## Interrupt Boundaries

The graph compiles using:
```python
interrupt_before=["Refactor"]
```

This intentionally pauses execution before:
- code modification
- autonomous rewrites
- final generation

---

# HITL Workflow

```text
Graph Executes
      ↓
Interrupt Triggered
      ↓
State Saved
      ↓
User Reviews Findings
      ↓
Approved Suggestions Submitted
      ↓
Graph Resumes
      ↓
RefactorAI Executes
```

---

# Resilience Architecture

## Defensive Execution

Each graph node is wrapped with:
```python
try-except isolation
```

to prevent:
- total graph failure
- cascading crashes
- invalid state corruption

---

# Retry System

The platform implements:
- exponential backoff
- retry loops
- parse correction
- connection recovery

for:
- Groq API failures
- malformed JSON
- transient timeouts

---

# LLM Integration Architecture

## Model Layer

Sentinel-Graph uses:
```text
llama-3.1-8b-instant
```

through:
```text
Groq API
```

---

# Why Groq Was Chosen

Groq provides:
- extremely high inference throughput
- low latency
- fast parallel execution

which is critical for:
```text
multi-agent orchestration systems
```

running many concurrent calls.

---

# Deployment Architecture

## Frontend
```text
React SPA + EJS templates
```

---

## Backend
```text
Node.js Express Gateway
```

---

## AI Engine
```text
FastAPI + LangGraph microservice
```

---

# Security & Reliability

The platform prioritizes:
- validation
- state consistency
- execution isolation
- checkpoint recovery
- controlled AI execution

instead of:
- unrestricted autonomous actions

---

# Engineering Outcomes

The architecture successfully demonstrates:
- graph-based AI orchestration
- stateful multi-agent execution
- resilient LLM workflows
- HITL-controlled AI systems
- parallel reasoning pipelines
- production-grade AI infrastructure

---

# Key Engineering Learnings

This project provided practical experience in:
- LangGraph state machines
- distributed orchestration
- multi-agent AI systems
- checkpoint persistence
- graph memory architectures
- resilient AI infrastructure
- HITL workflow design
- structured reasoning systems
- AI execution pipelines