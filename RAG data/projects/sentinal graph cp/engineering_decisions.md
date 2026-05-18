# Engineering Decisions

This document explains the key engineering and architectural decisions made while building Sentinel-Graph.

The project focused heavily on:
- multi-agent orchestration
- stateful AI workflows
- graph-based execution
- Human-in-the-Loop systems
- resilient LLM infrastructure
- modular reasoning pipelines

instead of building a simple stateless chatbot.

---

# 1. Multi-Agent Decomposition Instead of Single-Prompt Reasoning

## Decision

The platform was intentionally designed around:
```text
specialized multi-agent orchestration
```

instead of:
- monolithic prompts
- single-agent reasoning
- giant-context execution

---

## Why This Decision Was Made

Large prompts frequently cause:
- hallucinations
- inconsistent reasoning
- prompt drift
- unstable outputs
- higher token costs

The solution was to:
```text
split reasoning into isolated expert agents
```

Each agent solves:
- one narrow problem
- one reasoning domain
- one specialized task

---

## Result

This improved:
- reasoning quality
- consistency
- interpretability
- token efficiency
- prompt controllability

while allowing:
```text
an 8B model to behave like a much larger system
```

---

# 2. Choosing LangGraph Instead of Simple Chains

## Decision

The orchestration layer was implemented using:
```text
LangGraph
```

instead of:
- sequential LangChain chains
- linear pipelines
- custom orchestration logic

---

## Why This Decision Was Made

The platform required:
- state persistence
- branching execution
- fan-out parallelism
- checkpoint recovery
- conditional routing
- HITL interruption

Traditional sequential chains become difficult to manage when:
- workflows branch
- agents execute concurrently
- state must persist across interruptions

LangGraph naturally models:
```text
stateful cyclic AI workflows
```

---

## Advantages

LangGraph enabled:
- graph execution
- checkpoint memory
- parallel agents
- execution resumption
- state reducers
- interrupt boundaries

---

# 3. Shared Graph State Instead of Stateless Prompt Passing

## Decision

All workflows use:
```python
CodeReviewState
```

as:
```text
the shared operational memory layer
```

instead of repeatedly passing:
- raw prompts
- full conversation history
- duplicated context

---

## Why This Decision Was Made

Stateless systems waste tokens because:
- agents repeatedly receive duplicated context
- prompts grow rapidly
- reasoning becomes inefficient

Shared graph state enabled:
- targeted context reads
- structured memory propagation
- thread persistence
- state synchronization

---

## Result

This significantly improved:
- token efficiency
- execution continuity
- reasoning stability
- memory organization

---

# 4. Human-in-the-Loop (HITL) Interrupt Architecture

## Decision

Implemented:
```python
interrupt_before=["Refactor"]
```

to pause execution before:
- code rewriting
- autonomous modifications
- refactor application

---

## Why This Decision Was Made

Fully autonomous code rewriting introduces risks:
- unsafe edits
- destructive changes
- hallucinated modifications
- trust reduction

The system intentionally preserves:
```text
human approval authority
```

before code modifications occur.

---

## Result

This improved:
- operational safety
- user trust
- execution controllability
- workflow reliability

---

# 5. Parallel Fan-Out Agent Execution

## Decision

The review agents:
- BugHunter
- StyleGuard
- PerfArchitect

execute:
```text
concurrently
```

instead of sequentially.

---

## Why This Decision Was Made

The review agents are:
- logically independent
- domain specialized
- non-blocking

Sequential execution would:
- increase latency
- reduce responsiveness
- waste parallel compute opportunities

---

## Result

Parallel fan-out reduced:
- end-to-end review latency

while improving:
- throughput
- scalability
- responsiveness

---

# 6. Reducer-Based Parallel State Aggregation

## Decision

Used:
```python
Annotated[list, operator.add]
```

for:
- findings
- messages
- shared outputs

inside LangGraph state.

---

## Why This Decision Was Made

Parallel writes create:
- race conditions
- overwritten findings
- inconsistent aggregation

Reducers provide:
```text
thread-safe state merging
```

during concurrent execution.

---

## Result

This guaranteed:
- deterministic aggregation
- safe parallel execution
- consistent state updates

---

# 7. Markdown Code Extraction Instead of JSON Code Generation

## Decision

The system extracts generated code from:
```text
markdown fenced blocks
```

instead of strict JSON payloads.

---

## Why This Decision Was Made

JSON code generation frequently fails because:
- quotes break parsing
- escaping becomes unstable
- multiline formatting corrupts payloads

Markdown fenced blocks are:
- native to LLM behavior
- more stable
- easier to parse

---

## Extraction Strategy

The system:
1. extracts fenced code
2. strips markdown
3. injects into Monaco Editor

using:
```text
regex extraction pipelines
```

---

## Result

This achieved:
```text
near-perfect code extraction reliability
```

even on smaller models.

---

# 8. Choosing Groq + llama-3.1-8b-instant

## Decision

The platform intentionally uses:
```text
llama-3.1-8b-instant
```

through:
```text
Groq API
```

instead of:
- GPT-4 class models
- expensive frontier inference

---

## Why This Decision Was Made

The project focused on proving:
```text
orchestration can outperform brute-force scaling.
```

Groq provides:
- extremely high throughput
- low latency
- fast concurrent inference

which is critical for:
- parallel agents
- graph orchestration
- rapid retries

---

## Engineering Goal

The project intentionally explored:
```text
small-model systems engineering
```

rather than depending entirely on large frontier models.

---

# 9. Hexagonal Architecture for Backend Isolation

## Decision

The Node.js gateway uses:
```text
Ports & Adapters Architecture
```

to isolate:
- business logic
- HTTP transport
- AI engine integrations

---

## Why This Decision Was Made

The platform needed:
- backend portability
- isolated testing
- infrastructure abstraction
- service replaceability

The Python AI engine can now be replaced without modifying:
- Express routes
- frontend workflows
- application core logic

---

## Result

This improved:
- maintainability
- modularity
- infrastructure flexibility
- testing isolation

---

# 10. Defensive Crash Isolation Per Agent

## Decision

Every agent executes inside:
```python
try-except isolation boundaries
```

with safe fallback returns.

---

## Why This Decision Was Made

Multi-agent systems are vulnerable to:
- partial failures
- malformed outputs
- transient API errors

Without isolation:
- one failed node crashes the entire graph

---

## Result

Crash isolation allows:
- partial graph continuation
- graceful degradation
- resilient execution

instead of catastrophic workflow failure.

---

# 11. Retry + Exponential Backoff Strategy

## Decision

Implemented:
- retry loops
- self-correction prompts
- exponential backoff

for:
- malformed JSON
- API rate limits
- transient network failures

---

## Why This Decision Was Made

LLM infrastructure is:
```text
non-deterministic and failure-prone
```

The system needed:
- resilience
- recoverability
- autonomous correction

---

## Result

This improved:
- operational reliability
- execution continuity
- graph stability

under:
- HTTP 429 errors
- timeouts
- invalid outputs

---

# 12. Jaccard Similarity for Finding Deduplication

## Decision

Used:
```text
Jaccard Similarity
```

inside:
```text
Synthesizer
```

to merge overlapping findings from multiple agents.

---

## Similarity Formula

:contentReference[oaicite:0]{index=0}

---

## Why This Decision Was Made

Different agents may describe:
- identical bugs
- similar bottlenecks
- overlapping findings

using different wording.

Exact string matching was insufficient.

---

## Result

The deduplication system:
- merged semantically similar findings
- reduced noise
- improved readability
- preserved severity prioritization

---

# 13. Stateful Thread Persistence Using MemorySaver

## Decision

Implemented:
```python
MemorySaver()
```

as:
```text
checkpoint-based execution memory
```

---

## Why This Decision Was Made

The platform required:
- resumable execution
- session continuity
- HITL workflows
- graph recovery

Thread persistence enabled:
- interruption recovery
- execution resumption
- state restoration

using:
```text
thread_id-based checkpoint lookup
```

---

# 14. Controlled AI Refactoring Instead of Direct Rewrite Autonomy

## Decision

RefactorAI only executes:
- approved suggestions
- validated findings
- user-confirmed actions

---

## Why This Decision Was Made

Autonomous refactoring systems can:
- damage code
- introduce regressions
- over-modify logic

The architecture intentionally prioritizes:
- controlled execution
- observable modifications
- human oversight

---

# Engineering Philosophy

Sentinel-Graph was built around the belief:

```text
AI systems become more powerful when reasoning is structured,
stateful, specialized, and controllable.
```

The project focuses on:
- orchestration intelligence
- workflow engineering
- state propagation
- resilient execution
- Human-in-the-Loop safety

instead of:
- brute-force prompting
- uncontrolled generation
- giant-context monoliths

---

# Key Engineering Learnings

This project provided deep practical experience in:
- LangGraph orchestration
- graph-based AI systems
- stateful AI workflows
- parallel reasoning systems
- HITL architectures
- resilient LLM infrastructure
- distributed orchestration
- checkpoint persistence
- structured AI execution
- production-grade AI reliability engineering