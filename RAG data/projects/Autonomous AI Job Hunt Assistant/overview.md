# Autonomous AI Job Hunt Assistant

## Project Overview

The Autonomous AI Job Hunt Assistant is a locally hosted AI-powered workflow automation system designed to automate and manage the job application process using autonomous agents, workflow orchestration, and Human-in-the-Loop (HITL) approval mechanisms.

The system combines:
- AI reasoning
- workflow automation
- API orchestration
- email drafting
- interview scheduling
- activity logging

into a unified AI productivity platform.

The assistant was built with a strong emphasis on:
- safety
- human control
- automation reliability
- modular workflow design
- local sovereignty

rather than unrestricted autonomous execution.

---

# Core Objective

The primary objective of the project was to build an AI-powered assistant capable of automating repetitive job hunting workflows while ensuring that the user retains full execution control.

The system was designed to:
- draft professional emails
- schedule interviews
- manage application tracking
- automate repetitive workflows
- reduce manual effort
- centralize job search operations

while avoiding the risks of fully autonomous AI systems.

---

# Human-in-the-Loop Philosophy

One of the most important design principles of the project was:
```text
Draft First, Send Second
```

The AI assistant is intentionally prevented from directly executing sensitive actions such as sending emails without explicit user approval.

This architecture ensures:
- user control
- operational safety
- reduced hallucination risk
- secure automation
- trustworthiness

The AI assists the user rather than replacing user decision-making.

---

# High-Level Architecture

The system follows a decoupled architecture consisting of:

1. React Frontend
2. n8n Orchestration Layer
3. LLM Intelligence Layer
4. Google Workspace Integrations

---

## Frontend Layer

Built using:
- React 18
- Vite

The frontend acts as:
- command center
- draft review interface
- approval dashboard
- interaction layer

The UI supports:
- asynchronous draft approvals
- workflow monitoring
- chat-style interactions
- connection state management

---

## Orchestration Layer

The orchestration engine is built using:
```text
n8n
```

n8n manages:
- workflow routing
- API orchestration
- OAuth handling
- tool execution
- retry handling
- automation logic

The workflow engine acts as the central operational brain of the platform.

---

## Intelligence Layer

The system integrates:
- Gemini 2.0 Flash
- Groq Llama 3.3

for:
- intent classification
- entity extraction
- email drafting
- workflow reasoning
- NLP understanding

The LLM layer is responsible for:
- understanding user requests
- generating structured outputs
- routing workflows correctly

---

# Core Features

## AI-Powered Email Drafting

The system can:
- generate professional outreach emails
- customize responses contextually
- attach resumes automatically
- personalize content using role/company information

while requiring explicit approval before sending.

---

## Interview Scheduling Automation

The assistant integrates with:
```text
Google Calendar
```

to:
- create events
- detect scheduling conflicts
- manage interview workflows
- automate calendar coordination

---

## Google Workspace Integration

The system integrates with:
- Gmail
- Google Drive
- Google Calendar
- Google Sheets

to automate:
- communication
- document retrieval
- scheduling
- workflow logging

---

## Action Logging & Auditability

Every action is logged into:
```text
Google Sheets
```

including:
- draft creation
- approvals
- rejections
- meeting scheduling
- workflow events

This creates an auditable workflow history.

---

# Workflow Architecture

The system uses a modular workflow structure:

| Workflow | Responsibility |
|---|---|
| WF-001 | Main Chat Router |
| WF-002 | Email Draft Workflow |
| WF-003 | Calendar Workflow |
| WF-004 | Action Logger |

This separation improves:
- maintainability
- debugging
- scalability
- workflow isolation

---

# Engineering Focus Areas

The project focused heavily on:
- autonomous AI systems
- workflow orchestration
- Human-in-the-Loop safety
- API integration
- OAuth management
- resilient automation
- AI-driven productivity systems
- local-first deployment

---

# Technologies Used

## Frontend
- React 18
- Vite
- React Context
- useReducer

---

## Workflow & Automation
- n8n
- Docker
- Webhooks
- OAuth2

---

## AI & LLMs
- Gemini 2.0 Flash
- Groq Llama 3.3

---

## Integrations
- Gmail API
- Google Calendar API
- Google Sheets API
- Google Drive API

---

# Security-Oriented Design

The architecture intentionally prevents direct frontend access to:
- OAuth credentials
- API secrets
- LLM API keys

All sensitive operations are handled securely inside the orchestration layer.

The system prioritizes:
- safe automation
- controlled execution
- secure integrations
- protected credentials

---

# Engineering Learnings

This project provided practical experience in:
- AI agent orchestration
- workflow automation
- API integrations
- OAuth systems
- asynchronous state management
- autonomous workflow design
- LLM-driven routing systems
- resilient automation pipelines
- Human-in-the-Loop architectures

---

# Outcome

The project successfully demonstrated how autonomous AI systems can:
- improve productivity
- automate workflows
- integrate with external services
- assist decision making

while still maintaining:
- human oversight
- operational control
- safety boundaries
- reliability

The final system represents a production-oriented AI workflow automation architecture combining:
- frontend engineering
- AI reasoning
- workflow orchestration
- API integrations
- secure automation systems
```