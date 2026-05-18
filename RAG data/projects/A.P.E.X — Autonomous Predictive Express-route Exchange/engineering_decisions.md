# Engineering Decisions

This document explains the major architectural, ML, routing, cloud, and systems engineering decisions made while building A.P.E.X (Autonomous Predictive Express-route Exchange).

The project focused heavily on:
- real-time distributed intelligence
- predictive logistics systems
- graph-based routing
- operational resilience
- AI-assisted infrastructure systems
- cloud-native deployment

rather than building a simple logistics dashboard.

---

# 1. FASTag-as-IoT Architecture

## Decision

The platform was intentionally designed around:
```text
FASTag transaction telemetry
```

instead of relying on:
- dedicated GPS hardware
- proprietary IoT devices
- fleet-installed sensors

---

## Why This Decision Was Made

India already generates:
```text
millions of FASTag events daily
```

through existing RFID toll infrastructure.

The key insight was:
```text
FASTag movement patterns already behave like low-frequency GPS telemetry.
```

This allowed the system to:
- reuse national infrastructure
- avoid hardware deployment cost
- achieve large-scale coverage
- scale rapidly

without requiring additional physical infrastructure.

---

## Advantages

- zero additional hardware cost
- nationwide scalability
- existing infrastructure reuse
- easier adoption
- lower operational complexity

---

## Tradeoffs

### Advantages
- massive scalability
- low deployment cost
- realistic infrastructure integration

### Disadvantages
- lower temporal granularity than GPS
- sparse event timing
- indirect vehicle tracking

---

# 2. Choosing Firebase Realtime Database

## Decision

Used:
```text
Firebase Realtime Database (RTDB)
```

as the shared operational state layer.

---

## Why This Decision Was Made

The system required:
- real-time synchronization
- low-latency updates
- frontend reactivity
- distributed state sharing

Firebase RTDB provided:
- sub-100ms synchronization
- event-driven updates
- real-time subscriptions
- simple distributed coordination

without needing to build custom websocket infrastructure.

---

## System Benefits

Firebase became:
```text
the distributed operational memory of the platform
```

allowing:
- ML services
- frontend dashboards
- routing systems
- anomaly detectors

to coordinate through shared live state.

---

# 3. Choosing FastAPI + Cloud Run

## Decision

The backend agent was implemented using:
```text
FastAPI deployed on Google Cloud Run
```

---

## Why This Decision Was Made

The project required:
- stateless scalability
- fast deployment
- lightweight APIs
- async support
- ML inference compatibility

FastAPI provided:
- asynchronous endpoints
- low latency
- Python ML ecosystem compatibility
- SSE support

Cloud Run provided:
- autoscaling
- containerized deployment
- managed infrastructure
- operational simplicity

---

## Advantages

- rapid deployment
- serverless scaling
- container portability
- low operational overhead

---

# 4. Choosing XGBoost for Disruption Prediction

## Decision

Used:
```text
XGBoost
```

for disruption classification.

---

## Why This Decision Was Made

The system required:
- fast inference
- tabular data optimization
- strong feature importance
- operational interpretability
- lightweight deployment

XGBoost performs exceptionally well on:
- structured operational data
- nonlinear interactions
- sparse feature sets

while remaining:
- lightweight
- interpretable
- low-latency

---

## Why Not Deep Learning?

Deep neural networks were intentionally avoided because:
- training data volume was limited
- inference speed mattered more
- explainability was important
- operational simplicity was prioritized

---

## Advantages

- fast inference
- strong tabular performance
- low compute overhead
- interpretable predictions

---

# 5. Using Random Forest for Risk Scoring

## Decision

Implemented:
```text
Random Forest
```

as a continuous risk scoring system alongside XGBoost.

---

## Why This Decision Was Made

The system required:
- probabilistic operational scoring
- stable ensemble behavior
- robust nonlinear modeling

Random Forest provided:
- stable predictions
- reduced overfitting
- smooth operational scoring

used for:
- corridor ranking
- risk prioritization
- rerouting decisions

---

# 6. Choosing Weighted A* Search

## Decision

The routing engine uses:
```text
Weighted A* Search
```

instead of:
- Dijkstra
- BFS
- static shortest-path algorithms

---

## Why This Decision Was Made

The routing problem required:
- dynamic edge costs
- congestion-aware routing
- risk-sensitive navigation
- low-latency rerouting

Weighted A* provided:
- heuristic optimization
- faster convergence
- scalable pathfinding
- dynamic cost adaptation

---

## Routing Factors

The routing engine considers:
- congestion
- disruption severity
- node utilization
- route distance
- operational risk

instead of only shortest physical distance.

---

# 7. Graph-Based Logistics Modeling

## Decision

The logistics network was modeled as:
```text
a weighted graph
```

using:
```text
NetworkX
```

---

## Why This Decision Was Made

Supply chain systems naturally behave as:
- interconnected networks
- node-edge systems
- dynamic traffic graphs

Graph modeling enabled:
- pathfinding
- cascade propagation
- bottleneck analysis
- rerouting intelligence

---

# 8. Motter-Lai Inspired Cascade Propagation

## Decision

Implemented:
```text
cascade failure propagation logic
```

inspired by:
```text
Motter-Lai network failure theory
```

---

## Why This Decision Was Made

Real logistics disruptions rarely remain isolated.

A blocked corridor causes:
- rerouting stress
- neighboring congestion
- cascading bottlenecks
- systemic instability

The system needed to model:
```text
secondary disruption propagation
```

not only isolated failures.

---

## Result

This enabled:
- predictive congestion modeling
- network stress simulation
- early disruption forecasting

before failures became critical.

---

# 9. Event-Driven Architecture

## Decision

The platform was designed as:
```text
event-driven
```

instead of periodic batch-processing.

---

## Why This Decision Was Made

Real-time logistics systems require:
- immediate reactions
- live synchronization
- continuous monitoring
- operational responsiveness

Event-driven updates enabled:
- real-time rerouting
- live anomaly propagation
- instant dashboard updates
- continuous inference

---

# 10. SSE Instead of Full WebSocket Infrastructure

## Decision

Used:
```text
Server-Sent Events (SSE)
```

for live updates.

---

## Why This Decision Was Made

The frontend primarily required:
- one-way streaming
- live monitoring
- operational alerts

SSE was:
- simpler
- lightweight
- easier to deploy
- sufficient for dashboard streaming

without the complexity of bidirectional websocket infrastructure.

---

# 11. AI-Assisted Operations Using Gemini

## Decision

Integrated:
```text
Gemini 2.5 Flash via Vertex AI
```

for operational intelligence generation.

---

## Why This Decision Was Made

The project required:
- natural language operational analysis
- human-readable disruption explanations
- AI-generated recommendations

Traditional dashboards provide:
- raw metrics
- graphs
- alerts

but not:
- reasoning
- contextual analysis
- predictive summaries

Gemini transformed operational telemetry into:
```text
human-readable logistics intelligence
```

---

# 12. Cloud-Native Stateless Architecture

## Decision

The backend services were designed to remain:
```text
stateless
```

with Firebase acting as shared operational memory.

---

## Why This Decision Was Made

Stateless services simplify:
- scaling
- redeployment
- fault recovery
- autoscaling

This architecture improves:
- resilience
- horizontal scalability
- deployment flexibility

---

# 13. Operational Safety & Controlled Rerouting

## Decision

The system intentionally avoids:
- aggressive route oscillation
- unstable rerouting loops
- overreactive path switching

---

## Why This Decision Was Made

Autonomous rerouting systems can become unstable if:
- reroutes occur too frequently
- anomalies fluctuate rapidly
- edge weights oscillate

The platform implemented:
- reroute thresholds
- stability windows
- anomaly confidence scoring

before executing route changes.

---

# 14. Visualization-First Operational Design

## Decision

The frontend dashboard was designed as:
```text
an operational command center
```

instead of a static analytics page.

---

## Why This Decision Was Made

Logistics operators require:
- real-time situational awareness
- live route visibility
- disruption overlays
- operational explainability

The dashboard prioritizes:
- clarity
- operational intelligence
- rapid anomaly understanding

rather than purely aesthetic visualization.

---

# Engineering Philosophy Behind A.P.E.X

The project was designed around a central systems engineering philosophy:

```text
Existing infrastructure can become intelligent infrastructure
when combined with AI, graph systems, and real-time coordination.
```

The goal was not simply building:
- ML models
- dashboards
- routing systems

but building:
```text
a self-healing predictive logistics intelligence platform
```

capable of:
- autonomous reasoning
- predictive rerouting
- distributed coordination
- operational resilience

---

# Key Engineering Learnings

This project provided deep practical understanding of:
- distributed AI systems
- cloud-native infrastructure
- graph-based logistics modeling
- real-time synchronization
- operational ML systems
- routing algorithms
- autonomous infrastructure intelligence
- event-driven architectures
- resilience engineering