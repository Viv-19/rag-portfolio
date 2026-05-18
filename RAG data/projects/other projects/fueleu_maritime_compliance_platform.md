# FuelEU Maritime Compliance Platform

## Overview

FuelEU Maritime Compliance Platform is a full-stack compliance management system designed to simulate and manage:
```text
EU FuelEU Maritime regulatory compliance
```

for maritime operators and shipping fleets.

The platform allows users to:
- manage ship routes
- analyze greenhouse gas intensity
- compare emissions against FuelEU targets
- bank compliance surplus
- create compliance pools across ships

while following:
```text
production-grade software architecture principles
```

including:
- Hexagonal Architecture
- strict TypeScript typing
- modular domain-driven design
- full-stack testing workflows

---

# Objective

The objective of the project was to build:
```text
a production-oriented maritime compliance platform
```

that models:
- FuelEU compliance calculations
- route-based emissions analysis
- banking mechanisms
- fleet pooling systems

while exploring:
- AI-assisted software engineering
- phase-based development workflows
- architecture-first engineering practices

---

# Core Features

## Route Management

Users can:
- view ship routes
- filter emissions records
- manage maritime route data
- designate baseline routes for comparisons

---

## Emissions Comparison Dashboard

The:
```text
Compare Module
```

analyzes:
- route GHG intensity
- emissions differences
- compliance status

against the official:
```text
FuelEU target intensity
```

of:
```text
89.3368 gCO2e/MJ
```

---

## Banking System (Article 20)

The platform supports:
```text
Compliance Balance Banking
```

allowing operators to:
- store surplus compliance credits
- apply banked surplus later
- offset future deficits

based on:
```text
FuelEU Article 20
```

---

## Pooling System (Article 21)

The:
```text
Pooling Module
```

allows:
- multiple ships
- surplus vessels
- deficit vessels

to form:
```text
compliance pools
```

where:
- surplus balances offset deficits
- pool validity is verified
- balances are recalculated dynamically

based on:
```text
FuelEU Article 21
```

---

# Architecture

The project follows:
```text
Hexagonal Architecture (Ports & Adapters)
```

to maintain strict separation between:
- domain logic
- application logic
- infrastructure
- frontend UI
- APIs

---

# Backend Architecture

The backend is divided into:
- Domain Layer
- Application Layer
- Ports
- Adapters
- Infrastructure

---

# Domain Layer

Contains:
- Route entities
- ShipCompliance models
- Banking models
- Pooling entities

without:
- framework dependencies
- Express imports
- database logic

---

# Application Layer

Implements:
- ComputeCB
- CompareRoutes
- BankSurplus
- ApplyBanked
- CreatePool

as:
```text
pure business use cases
```

---

# Ports & Adapters

The architecture isolates:
- inbound HTTP adapters
- outbound database systems
- UI integrations

through:
```text
well-defined interfaces
```

---

# Frontend Architecture

The frontend uses:
- React 18
- TypeScript
- Vite
- TailwindCSS

with a modular:
```text
hexagonal frontend structure
```

---

# Frontend Modules

The frontend contains:
- Routes Dashboard
- Compare Dashboard
- Banking Dashboard
- Pooling Dashboard

with reusable:
- navigation systems
- layouts
- API clients
- state management patterns

---

# System Workflow

```text
Frontend (React)
        ↓
REST API (Express)
        ↓
Application Use Cases
        ↓
Domain Models
        ↓
PostgreSQL Database
```

---

# Compliance Logic

The system models:
```text
Compliance Balance (CB)
```

using:
```text
CB = (Target − Actual) × Energy
```

which determines:
- surplus compliance
- deficit compliance
- banking eligibility
- pooling eligibility

---

# AI-Assisted Development Workflow

One of the most unique aspects of this project was:
```text
structured AI-assisted engineering
```

The development process used:
- ChatGPT
- ChatGPT Deep Research
- Antigravity (Google DeepMind)

as:
```text
collaborative engineering assistants
```

instead of:
```text
fully autonomous code generators
```

---

# Multi-Agent Engineering Workflow

The workflow followed:
```text
phase-based AI-assisted development
```

---

# Development Pipeline

1. Domain research
2. Architecture planning
3. Prompt engineering
4. AI-assisted code generation
5. Manual validation
6. Integration debugging
7. Test verification

---

# AI Responsibilities

AI agents accelerated:
- scaffolding
- entity creation
- SQL migrations
- React component generation
- test generation
- debugging suggestions

---

# Human Responsibilities

Manual validation ensured:
- regulatory correctness
- architecture integrity
- integration stability
- compliance formula validation
- domain correctness

---

# Technology Stack

## Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Zod

---

## Frontend
- React 18
- Vite
- TailwindCSS
- React Router
- Recharts

---

## Testing
- Jest
- Supertest
- Vitest
- React Testing Library

---

## CI/CD
- GitHub Actions

---

# Testing Infrastructure

The project contains:
```text
101 automated tests
```

across:
- backend APIs
- frontend components
- integration flows

---

# Test Coverage

| Stack | Tests |
|---|---|
| Backend | 56 |
| Frontend | 45 |
| Total | 101 |

---

# Engineering Challenges

## Regulatory Validation

One major challenge was:
```text
ensuring FuelEU regulatory correctness
```

AI-generated logic required:
- manual formula validation
- compliance verification
- threshold confirmation

against:
- FuelEU documentation
- maritime regulations

---

## Floating-Point Precision

Compliance calculations occasionally produced:
```text
-0
```

in JavaScript due to:
- floating-point arithmetic
- precision behavior

This required:
- tolerant assertions
- precision-aware testing

using:
```text
toBeCloseTo()
```

instead of strict equality.

---

## Frontend-Backend Integration

The system initially experienced:
```text
Failed to fetch
```

integration issues caused by:
- incorrect API base URLs
- missing CORS configuration

This was resolved through:
- proper environment configuration
- Express CORS setup
- API client corrections

---

## AI-Generated Test Issues

Some generated tests failed because:
- DOM selectors were ambiguous
- duplicated text values existed
- assumptions about unique elements were incorrect

These required:
- selector refinement
- count-based assertions
- explicit UI targeting

---

# Key Learnings

This project provided practical experience in:
- Hexagonal Architecture
- full-stack TypeScript systems
- regulatory software engineering
- AI-assisted development workflows
- prompt engineering
- architecture-first development
- structured testing systems
- frontend/backend integration
- domain-driven modeling

---

# AI Engineering Insights

One major takeaway from the project was:
```text
AI works best as an engineering accelerator,
not as an autonomous replacement for software engineering judgment.
```

The project demonstrated that:
- AI excels at structure replication
- AI accelerates boilerplate creation
- AI improves development speed

but:
- humans must validate architecture
- humans must verify domain logic
- humans must review integration behavior

---

# Outcome

The final platform successfully demonstrates:
- maritime compliance simulation
- production-grade architecture
- modular full-stack engineering
- AI-assisted development workflows
- structured regulatory systems

while maintaining:
- strong architectural discipline
- modularity
- testability
- maintainability
- domain correctness

The project also serves as a strong example of:
```text
human-guided AI-assisted software engineering
```

where:
- AI accelerates implementation
- humans preserve correctness
- architecture remains controlled
- system quality remains production-oriented