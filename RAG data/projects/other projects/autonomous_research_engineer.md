# Autonomous Research Engineer (ARE)

## Overview

Autonomous Research Engineer (ARE) is a production-grade agentic AI research orchestration platform designed to automate the complete scientific research lifecycle.

The system combines:
- LangGraph state machines
- Hexagonal Architecture
- Human-in-the-Loop workflows
- academic evidence retrieval
- autonomous experiment orchestration
- scientific report generation

to create a structured and controllable AI research pipeline.

Instead of functioning as a simple RAG chatbot, ARE behaves like:
```text
an autonomous scientific research workflow engine
```

capable of:
- clarifying research intent
- evaluating academic evidence
- generating executable experiments
- validating outcomes
- producing formal research reports

---

# Objective

The objective of ARE was to explore how:
```text
stateful multi-agent AI workflows
```

can automate:
- scientific reasoning
- experiment orchestration
- research planning
- evidence evaluation
- iterative refinement

while preserving:
- transparency
- controllability
- human oversight

through Human-in-the-Loop checkpoints.

---

# Core Features

## LangGraph State Machine Workflow

The platform implements a:
```text
9-node LangGraph execution pipeline
```

covering the full research lifecycle:
- intake
- routing
- evidence collection
- planning
- execution
- evaluation
- report generation

---

## Human-in-the-Loop (HITL) Guardrails

The workflow intentionally pauses at critical stages:
- research contract approval
- post-experiment review
- iterative refinement

before continuing execution.

This ensures:
- operator control
- safe orchestration
- bounded autonomy
- research validation

---

## Academic Evidence Grounding

ARE integrates with:
- Semantic Scholar
- ArXiv

to retrieve:
- academic metadata
- evidence references
- knowledge gaps
- literature grounding

before experiments begin.

---

## Autonomous Experiment Orchestration

The platform generates:
- experiment plans
- executable research code
- runtime execution logs
- artifacts

through:
```text
NODE-5 Execution Controller
```

---

## Scientific Critic & Evaluation

The:
```text
NODE-6 Critic
```

evaluates:
- execution outcomes
- hypothesis validity
- confidence metrics
- experimental conclusions

before deciding:
- conclusive
- inconclusive
- contradictory

research outcomes.

---

## Real-Time Execution Streaming

The backend exposes:
```text
Server-Sent Events (SSE)
```

to stream:
- reasoning logs
- node transitions
- HITL checkpoints
- execution events
- graph progress

to the frontend in real time.

---

# Architecture

ARE follows a:
```text
Hexagonal Architecture (Ports & Adapters)
```

combined with:
```text
LangGraph state orchestration
```

to separate:
- domain logic
- infrastructure
- APIs
- LLM providers
- search systems

---

# Core Architectural Layers

## Core Domain (`are/core/`)

Contains:
- GraphState
- routing logic
- node orchestration
- pure business logic

without external side effects.

---

## Ports (`are/ports/`)

Defines abstract interfaces such as:
- `LLMPort`
- `SearchPort`
- `AuditPort`

to isolate external dependencies.

---

## Adapters (`are/adapters/`)

Implements:
- Gemini adapters
- Groq adapters
- Semantic Scholar integrations
- ArXiv integrations
- storage connectors

---

## Application Layer (`are/application/`)

Responsible for:
- dependency injection
- graph initialization
- runtime wiring
- ResearchService orchestration

---

## Interface Layer (`are/interfaces/`)

Provides:
- FastAPI backend
- CLI execution
- frontend integration

without embedding business logic.

---

# LangGraph Workflow

The platform executes through:
```text
NODE-0 → NODE-8
```

covering the complete research lifecycle.

---

# Workflow Breakdown

| Node | Responsibility |
|---|---|
| NODE-0 | Research Intake & Normalization |
| NODE-1 | Knowledge Assessment Router |
| NODE-2 | Evidence Collection |
| NODE-3 | Research Contract Planning |
| NODE-4 | Human Approval (HITL) |
| NODE-5 | Experiment Execution |
| NODE-6 | Scientific Critic |
| NODE-7 | HITL Reflection Loop |
| NODE-8 | Final Report Generation |

---

# State Management

All workflow execution operates using:
```python
GraphState
```

which acts as:
```text
the shared memory layer of the research workflow
```

The state stores:
- normalized questions
- evidence
- hypotheses
- execution logs
- confidence scores
- verdicts
- reports

throughout execution.

---

# Human-in-the-Loop Architecture

The system intentionally pauses execution at:
- NODE-0 Confirm
- NODE-4 Approval
- NODE-7 Reflection Loop

before:
- expensive execution
- iterative retries
- final conclusions

This creates:
```text
bounded autonomous research execution
```

instead of unrestricted AI autonomy.

---

# API System

The backend uses:
```text
FastAPI
```

to expose:
- REST APIs
- SSE event streaming
- report retrieval
- HITL approvals

---

# Important Endpoints

| Endpoint | Purpose |
|---|---|
| `POST /api/research` | Start research workflow |
| `GET /api/events/{session_id}` | Real-time SSE stream |
| `GET /api/status/{session_id}` | Workflow status |
| `POST /api/approve/{session_id}` | HITL approval |
| `GET /api/report/{session_id}` | Final report retrieval |
| `GET /api/health` | System health |

---

# Event Streaming System

The SSE layer streams:
- node reasoning
- graph transitions
- HITL requirements
- execution completion
- generated artifacts
- runtime failures

in real time to the frontend.

---

# Technology Stack

## Backend & AI
- Python 3.10+
- FastAPI
- LangGraph
- Pydantic

---

## Architecture
- Hexagonal Architecture
- Ports & Adapters
- Dependency Injection

---

## AI Providers
- Groq
- Gemini
- Mock LLM adapters

---

## Academic Search
- Semantic Scholar
- ArXiv

---

## Testing
- Pytest
- Unit Testing
- Integration Testing

---

# Engineering Challenges

## Stateful Research Orchestration

Managing:
- long-running workflows
- iterative loops
- HITL interruptions
- execution persistence

required robust:
```text
stateful graph orchestration
```

instead of stateless request pipelines.

---

## Structured Scientific Validation

Ensuring:
- schema-safe outputs
- deterministic node transitions
- reliable evidence propagation

required strict:
- Pydantic validation
- typed GraphState enforcement
- controlled state mutation

---

## Human Approval Synchronization

Pausing and resuming workflows safely required:
- execution checkpoints
- state persistence
- interrupt boundaries
- approval synchronization

across:
- APIs
- graph execution
- frontend interactions

---

## Provider Abstraction

The system needed to remain:
- provider agnostic
- extensible
- testable

which led to implementing:
```text
Ports & Adapters abstraction
```

for:
- LLM providers
- academic search engines
- storage systems

---

# Key Learnings

This project provided practical experience in:
- LangGraph orchestration
- stateful AI workflows
- scientific AI systems
- Human-in-the-Loop architectures
- Hexagonal Architecture
- dependency injection
- autonomous execution systems
- SSE streaming
- workflow persistence
- structured reasoning pipelines

---

# Outcome

ARE successfully demonstrates how:
- graph orchestration
- structured AI workflows
- HITL systems
- academic grounding
- autonomous execution
- stateful memory

can be combined into:
```text
a production-grade autonomous scientific research platform
```

capable of:
- orchestrating research workflows
- validating evidence
- managing iterative experimentation
- generating scientific reports

with:
- transparency
- controllability
- operational reliability