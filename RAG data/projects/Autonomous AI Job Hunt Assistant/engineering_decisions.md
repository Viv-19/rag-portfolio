# Engineering Decisions

This document explains the major engineering, architectural, and workflow decisions made while building the Autonomous AI Job Hunt Assistant.

The project focused heavily on:
- safe AI automation
- workflow orchestration
- Human-in-the-Loop systems
- resilient API integrations
- autonomous agent design
- practical productivity automation

rather than building a fully uncontrolled autonomous agent.

---

# 1. Choosing n8n Instead of a Custom Backend

## Decision

Used:
```text
n8n
```

as the orchestration engine instead of building a fully custom orchestration layer using:
- Node.js
- FastAPI
- LangChain
- LangGraph

---

## Why This Decision Was Made

The project required:
- rapid workflow iteration
- visual debugging
- OAuth integration
- API orchestration
- modular automation pipelines

n8n provided:
- visual workflow tracing
- built-in integrations
- OAuth credential handling
- retry mechanisms
- webhook support
- low development overhead

This dramatically accelerated development speed.

---

## Advantages

- visual debugging
- rapid prototyping
- built-in API connectors
- reusable workflows
- easier workflow maintenance
- integrated credential management

---

## Tradeoffs

### Advantages
- fast iteration
- simpler orchestration
- lower backend complexity
- workflow transparency

### Disadvantages
- lower low-level flexibility
- orchestration abstraction limitations
- workflow complexity at large scale

---

# 2. Human-in-the-Loop (HITL) Safety Architecture

## Decision

Implemented a strict:
```text
Draft First, Send Second
```

approval workflow.

The AI assistant was intentionally prevented from directly sending emails autonomously.

---

## Why This Decision Was Made

Fully autonomous email execution introduces risks:
- hallucinated content
- accidental sends
- wrong recipients
- unsafe automation
- loss of user control

The goal was:
- AI-assisted workflows
- not uncontrolled AI execution

---

## Architecture Design

The workflow was intentionally split into:
1. draft generation
2. approval step
3. execution phase

The email-sending path only activates after explicit approval.

---

## Result

This significantly improved:
- user trust
- workflow safety
- operational reliability
- system controllability

---

# 3. Decoupled Frontend & Workflow Layer

## Decision

Separated:
- React frontend
- n8n orchestration layer

into independent systems.

---

## Why This Decision Was Made

The frontend focuses on:
- UX
- state management
- approvals
- interaction flow

The orchestration layer focuses on:
- automation
- API execution
- workflow routing
- integrations

This separation improved:
- maintainability
- modularity
- debugging
- scalability

---

# 4. Intent Routing Architecture

## Decision

Implemented an LLM-powered intent router before workflow execution.

---

## Why This Decision Was Made

User prompts can represent multiple workflow categories:
- email actions
- scheduling
- logging
- queries
- approvals

Hardcoded routing logic would:
- scale poorly
- become rigid
- reduce flexibility

The LLM intent router allowed:
- dynamic routing
- natural language interaction
- extensible workflow handling

---

## Example

```text
"Schedule interview with Acme tomorrow"
```

gets converted into:
```json
{
  "intent": "SCHEDULE_MEETING"
}
```

which routes to the calendar workflow automatically.

---

# 5. Structured JSON LLM Outputs

## Decision

The LLM was instructed to return:
```text
strict structured JSON
```

instead of free-form text.

---

## Why This Decision Was Made

Free-form outputs frequently caused:
- parsing failures
- malformed workflow data
- broken automation chains

Structured JSON improved:
- workflow reliability
- automation consistency
- validation handling
- downstream processing

---

## Result

The system became significantly more deterministic and stable.

---

# 6. Using Google Sheets as Operational Storage

## Decision

Used:
```text
Google Sheets
```

for:
- audit logging
- draft storage
- workflow history
- lightweight persistence

instead of deploying a dedicated database initially.

---

## Why This Decision Was Made

The project prioritized:
- simplicity
- visibility
- rapid development
- easy debugging

Google Sheets provided:
- human-readable logs
- real-time visibility
- low setup complexity
- collaborative inspection

---

## Tradeoffs

### Advantages
- fast setup
- easy monitoring
- no DB infrastructure overhead

### Disadvantages
- not suitable for very high scale
- limited query flexibility
- weaker concurrency guarantees

---

# 7. Local-First Deployment Philosophy

## Decision

The system was designed primarily for:
- local hosting
- local orchestration
- self-hosted automation

instead of cloud-first deployment.

---

## Why This Decision Was Made

The project handled:
- emails
- resumes
- schedules
- personal workflow data

Local deployment improved:
- privacy
- user ownership
- deployment control
- experimentation freedom

---

# 8. Docker-Based Runtime Isolation

## Decision

Used:
```text
Docker
```

to host:
- n8n
- workflow services
- integrations

---

## Why This Decision Was Made

Docker simplified:
- environment consistency
- reproducibility
- deployment portability
- dependency isolation

It also reduced:
- local environment conflicts
- setup complexity
- runtime inconsistencies

---

# 9. OAuth Credential Isolation

## Decision

The frontend never directly accessed:
- Gmail credentials
- Google OAuth tokens
- LLM API keys

All credentials remained isolated inside n8n.

---

## Why This Decision Was Made

Frontend exposure of credentials creates major security risks.

The architecture intentionally enforced:
```text
Frontend → n8n → External APIs
```

This improved:
- security
- credential isolation
- access control
- operational safety

---

# 10. Graceful Failure & Retry Design

## Decision

Implemented retry and fallback mechanisms for:
- LLM failures
- rate limits
- malformed outputs
- API failures

---

## Why This Decision Was Made

Autonomous systems become unreliable without:
- fault tolerance
- retry handling
- graceful degradation

The project intentionally prioritized:
- resilience
- recoverability
- workflow continuity

over aggressive automation speed.

---

# 11. Lightweight SPA Frontend Strategy

## Decision

Used:
- React
- Vite
- Context API
- useReducer

instead of heavier frontend architectures.

---

## Why This Decision Was Made

The application primarily required:
- fast interaction
- async approval flows
- workflow visualization
- responsive UX

A lightweight SPA architecture improved:
- development speed
- simplicity
- frontend performance

---

# 12. AI-Assisted, Not AI-Controlled Philosophy

## Core Philosophy

One of the most important engineering philosophies behind the project was:

```text
AI should assist human workflows, not completely replace human control.
```

The system was intentionally designed so:
- humans approve actions
- AI drafts and assists
- workflows remain observable
- execution remains controllable

---

# Engineering Perspective

The project was built to explore practical autonomous AI systems while maintaining:
- safety
- reliability
- observability
- modularity
- human oversight

The focus was not only on making workflows autonomous, but on designing automation systems that remain:
- trustworthy
- maintainable
- resilient
- production-oriented

This project provided strong practical understanding of:
- AI orchestration
- workflow engineering
- autonomous systems
- API integrations
- secure automation architecture
- Human-in-the-Loop AI design