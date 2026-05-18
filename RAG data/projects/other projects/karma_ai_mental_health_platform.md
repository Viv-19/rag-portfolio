# Karma AI — Mental Health Diagnostic Platform

## Overview

Karma AI is a:
```text
production-grade AI-powered mental health assessment platform
```

designed to conduct:
- psychological screening
- mental health evaluations
- symptom analysis
- questionnaire-based diagnostics

through:
```text
a conversational AI chat interface
```

The platform integrates:
- validated clinical assessment scales
- FastAPI backend systems
- persistent state-machine orchestration
- MySQL-based session recovery
- responsive frontend architecture
- continuous background audio systems

to create:
```text
a scalable digital mental health assessment workflow
```

---

# Objective

The goal of Karma AI was to build:
```text
a conversational clinical assessment platform
```

capable of:
- guiding users through multi-stage mental health evaluations
- dynamically selecting assessment modules
- persisting long-running psychological sessions
- generating interpretable mental health reports

while maintaining:
- scalability
- persistence
- usability
- modular clinical architecture

---

# Core Features

## Conversational Assessment Interface

The platform uses:
```text
chat-driven psychological assessment
```

instead of:
- static forms
- multi-page questionnaires
- traditional survey interfaces

This creates:
- smoother user interaction
- guided progression
- conversational UX flow

---

# Clinical Assessment Modules

The platform integrates:
```text
113 validated psychological assessment questions
```

across:
- autism
- anxiety
- depression
- insomnia
- sexual health
- eating disorders

---

# Supported Clinical Modules

| Module | Assessment | Questions |
|---|---|---|
| AQ | Autism Quotient | 50 |
| GAD-7 | Anxiety Assessment | 7 |
| QIDS-SR | Depression Severity | 16 |
| ISI | Insomnia Severity | 7 |
| ASEX | Sexual Health | 5 |
| EDE-Q | Eating Disorders | 28 |

---

# AI-Driven Triage Workflow

The system first conducts:
```text
triage-based module selection
```

through:
- initial screening questions
- conditional module routing
- dynamic assessment selection

This prevents:
- unnecessary questionnaires
- user fatigue
- excessive assessments

---

# Persistent Session Recovery

The platform supports:
```text
stateful session persistence
```

through:
- database-backed state storage
- JSON state snapshots
- generator restoration
- session recovery

allowing:
- interrupted assessments
- resumable workflows
- server restart recovery

---

# Continuous Background Music System

One unique feature is:
```text
continuous binaural background audio
```

with:
- seamless page persistence
- playback memory
- mute controls
- persistent audio state

to create:
- calming interaction flow
- uninterrupted user experience

---

# Architecture

Karma AI follows:
```text
layered stateless API architecture
```

combined with:
```text
database-persisted workflow state management
```

---

# High-Level Architecture

```text
Frontend (Vanilla JS)
        ↓ HTTP/JSON
FastAPI Backend
        ↓
State Machine Layer
        ↓
Question Generators
        ↓
MySQL Database
```

---

# Architectural Principles

The system was designed around:
- stateless API execution
- persistent database state
- modular assessment generators
- clear separation of concerns
- recoverable workflows

---

# Backend Architecture

The backend uses:
- FastAPI
- SQLAlchemy
- Pydantic
- MySQL

for:
- REST APIs
- validation
- persistence
- orchestration

---

# Core Backend Components

## api.py

Handles:
- REST endpoints
- session APIs
- question routing
- answer submission
- result retrieval

---

## chat_state_machine.py

Implements:
```text
the conversational assessment state engine
```

managing:
- triage flow
- module transitions
- completion states
- workflow persistence

---

## question_generator.py

Acts as:
```text
the centralized clinical question database
```

containing:
- all 113 questions
- scoring systems
- module generators
- response mappings

---

## db.py

Manages:
- ORM models
- database operations
- session persistence
- state serialization

---

## results.py

Responsible for:
- score aggregation
- interpretation generation
- clinical result formatting

---

# State Machine Architecture

One of the most important parts of the system is:
```text
the persistent chat state machine
```

---

# Workflow States

| State | Purpose |
|---|---|
| TRIAGE | Initial module selection |
| MODULE | Running active assessments |
| COMPLETE | Assessment finished |

---

# Workflow Lifecycle

```text
TRIAGE
    ↓
MODULE
    ↓
MODULE
    ↓
COMPLETE
```

---

# Dynamic Module Routing

The triage engine dynamically determines:
```text
which clinical modules should execute
```

based on:
- user responses
- screening logic
- assessment selection rules

---

# Generator Restoration System

A major engineering challenge involved:
```text
restoring generator state after persistence
```

The system reconstructs:
- module generators
- previous answers
- progression indexes
- scoring context

after:
- database reload
- server restart
- interrupted sessions

---

# Database Architecture

The platform uses:
```text
MySQL persistent storage
```

for:
- user data
- session states
- serialized workflows

---

# Core Tables

## users

Stores:
- user profile data
- demographic information
- timestamps

---

## sessions

Stores:
- serialized JSON workflow state
- module progression
- answers
- scores
- timestamps

---

# State Persistence Strategy

The entire workflow state is stored as:
```text
JSON blobs
```

inside:
```sql
chat_state JSON
```

This allows:
- exact workflow restoration
- stateless API scaling
- multi-instance compatibility

---

# Frontend Architecture

The frontend uses:
- Vanilla JavaScript
- TailwindCSS
- HTML5/CSS3

for:
- lightweight rendering
- responsive UI
- low frontend complexity

---

# Frontend Components

## chat.js
Handles:
- question rendering
- answer submission
- chat progression
- UI state management

---

## api.js
Provides:
- API abstraction
- request handling
- response parsing

---

## report.js
Generates:
- result displays
- score rendering
- assessment interpretation views

---

# API Architecture

The backend exposes:
```text
RESTful assessment APIs
```

for:
- session creation
- question retrieval
- answer submission
- result generation

---

# Important Endpoints

| Endpoint | Purpose |
|---|---|
| `POST /api/session/create` | Create assessment session |
| `GET /api/session/{id}/question` | Get active question |
| `POST /api/session/{id}/answer` | Submit answer |
| `GET /api/session/{id}/results` | Fetch final report |
| `GET /api/health` | Health check |

---

# Technology Stack

## Backend
- FastAPI
- SQLAlchemy
- MySQL
- Pydantic

---

## Frontend
- Vanilla JavaScript
- HTML5
- CSS3
- TailwindCSS

---

## Persistence
- MySQL JSON storage
- ORM serialization

---

## Audio System
- Persistent browser audio engine
- playback state synchronization

---

# Engineering Challenges

## Persistent Stateful Workflows

One major challenge was:
```text
maintaining long-running conversational workflows
```

across:
- page refreshes
- server restarts
- interrupted sessions

This required:
- serialized state persistence
- deterministic restoration
- generator replay systems

---

# Generator Reconstruction

Because:
```text
question generators are runtime objects
```

they cannot simply be serialized directly.

The system reconstructs:
- generators
- answer history
- internal indexes

by replaying:
```text
stored answers into regenerated generators
```

during:
```text
state restoration
```

---

# Stateless API + Stateful Workflows

The API layer was intentionally designed to remain:
```text
stateless
```

while:
```text
workflow persistence lives entirely in the database
```

This enables:
- horizontal backend scaling
- multi-instance compatibility
- fault tolerance

---

# Clinical Questionnaire Integration

Integrating:
- multiple clinical scales
- unique scoring systems
- different response formats

required:
- unified generator architecture
- standardized interfaces
- modular scoring pipelines

---

# Frontend UX Challenges

Maintaining:
```text
smooth conversational flow
```

required:
- asynchronous rendering
- dynamic answer components
- progress continuity
- audio persistence

without:
- frontend frameworks
- large UI libraries

---

# Performance Considerations

The system was optimized for:
- low frontend overhead
- minimal database queries
- stateless backend execution
- lightweight REST communication

---

# Key Learnings

This project provided practical experience in:
- FastAPI backend systems
- state machine architecture
- workflow persistence
- session recovery systems
- conversational AI interfaces
- REST API engineering
- ORM modeling
- clinical questionnaire integration
- stateless scalable backend design
- frontend/backend orchestration

---

# Production Engineering Insights

A major architectural insight from the project was:
```text
stateful workflows should persist externally from runtime processes
```

instead of:
- relying on in-memory execution state

This dramatically improves:
- recoverability
- scalability
- fault tolerance
- distributed execution compatibility

---

# Outcome

Karma AI successfully demonstrates:
- AI-driven conversational assessments
- persistent state-machine workflows
- scalable session management
- modular clinical systems
- stateless backend APIs
- production-oriented architecture

while maintaining:
- recoverability
- modularity
- scalability
- persistence
- lightweight frontend performance

The project serves as a strong example of:
```text
stateful conversational AI workflow engineering
```

combined with:
```text
production-grade backend architecture
```