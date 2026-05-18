# Engineering Decisions

This document explains the major architectural, training, optimization, and deployment decisions made while building the `vivesh-coder` fine-tuned coding assistant.

The project focused heavily on:
- low-resource AI engineering
- efficient fine-tuning
- model compression
- local deployment
- practical inference optimization

rather than simply maximizing benchmark performance.

---

# 1. Choosing LLaMA 3.2 3B as the Base Model

## Decision

Selected:

```text
meta-llama/Llama-3.2-3B
```

as the foundation model for fine-tuning.

---

## Why This Decision Was Made

The project required a model that:
- was strong enough for code understanding
- fit within consumer GPU constraints
- supported local deployment
- allowed efficient fine-tuning

Larger models:
- required expensive infrastructure
- exceeded VRAM limitations
- increased deployment complexity

Smaller models:
- often lacked strong reasoning and code quality

The 3B parameter range provided a strong balance between:
- capability
- cost
- speed
- deployability

---

# 2. Choosing QLoRA Instead of Full Fine-Tuning

## Decision

Used:
```text
QLoRA (4-bit NF4 + LoRA)
```

instead of full parameter fine-tuning.

---

## Why This Decision Was Made

Full fine-tuning of a 3B model requires:
- significantly more VRAM
- larger GPUs
- higher compute cost
- slower experimentation

The project hardware constraint was:
```text
RTX 4060 Laptop GPU (8 GB VRAM)
```

QLoRA enabled:
- low-memory training
- consumer GPU compatibility
- faster iteration
- lower training cost

while still achieving strong performance.

---

## Key Optimization

Only:
```text
~54M trainable parameters
```

were updated:
```text
1.68% of total model parameters
```

This dramatically reduced memory usage.

---

## Tradeoffs

### Advantages
- lower VRAM requirements
- faster training
- lower cost
- practical experimentation
- consumer hardware support

### Disadvantages
- slightly lower ceiling than full fine-tuning
- adapter dependency during training
- some performance limitations

---

# 3. Using 4-bit NF4 Quantization During Training

## Decision

Loaded the base model using:
```text
4-bit NF4 quantization
```

via:
```text
bitsandbytes
```

---

## Why This Decision Was Made

Without quantization:
- the model would not fit into 8 GB VRAM
- training would become unstable
- experimentation would be limited

NF4 quantization provided:
- strong memory compression
- good numerical stability
- minimal quality degradation

---

## Engineering Impact

This reduced model memory footprint significantly and enabled:
- gradient checkpointing
- larger effective batch sizes
- stable local training

---

# 4. Token Length Filtering Strategy

## Decision

Applied a strict:
```text
512-token maximum
```

filter during dataset preparation.

---

## Why This Decision Was Made

Long sequences dramatically increase:
- VRAM consumption
- training instability
- attention computation cost

Without filtering:
- Out-Of-Memory (OOM) crashes occurred
- truncation corrupted training quality

The filtering strategy ensured:
- stable training
- predictable memory usage
- efficient throughput

---

## Tradeoff

The model sacrificed some long-context training capability in exchange for:
- stable fine-tuning
- lower hardware requirements
- faster iteration

---

# 5. Choosing Instruction-Tuning Format

## Decision

Converted all datasets into a unified:
```text
Instruction → Response
```

training format.

---

## Why This Decision Was Made

The deployment goal was to create:
- conversational coding behavior
- prompt-following capability
- assistant-like responses

Instruction tuning improved:
- consistency
- prompting behavior
- usability
- inference quality

---

# 6. Applying LoRA to All Linear Layers

## Decision

LoRA adapters were applied broadly across linear layers.

---

## Why This Decision Was Made

Code generation tasks require adaptation across:
- attention mechanisms
- reasoning layers
- token prediction behavior

Restricting LoRA too narrowly reduced adaptation quality.

Broader coverage improved:
- coding specialization
- instruction following
- generation consistency

---

# 7. Choosing GGUF as Deployment Format

## Decision

Converted the merged model into:
```text
GGUF
```

format for deployment.

---

## Why This Decision Was Made

GGUF is optimized for:
- local inference
- llama.cpp ecosystem
- Ollama integration
- lightweight deployment

The format provides:
- efficient loading
- compatibility
- optimized inference pipelines

---

# 8. Choosing Q4_K_M Quantization

## Decision

Used:
```text
Q4_K_M
```

quantization for the final deployed model.

---

## Why This Decision Was Made

The goal was balancing:
- model size
- inference speed
- response quality

Q4_K_M provided:
- major compression
- good quality retention
- fast inference

while remaining usable on:
```text
4 GB VRAM systems
```

---

## Compression Results

| Stage | Size |
|---|---|
| FP16 Model | ~6 GB |
| Q4_K_M Model | 1.88 GB |

Compression achieved:
```text
68.6% reduction
```

---

## Tradeoffs

### Advantages
- small deployment size
- fast inference
- low VRAM usage
- consumer hardware compatibility

### Disadvantages
- minor accuracy degradation
- reduced numerical precision
- occasional generation instability

---

# 9. Choosing Ollama for Deployment

## Decision

Used:
```text
Ollama
```

for local deployment and inference serving.

---

## Why This Decision Was Made

The project required:
- simple deployment
- local REST APIs
- fast setup
- user-friendly inference
- lightweight serving

Ollama simplified:
- model registration
- API serving
- CLI inference
- deployment portability

---

# 10. Local-First AI Philosophy

## Decision

The project intentionally prioritized:
- local inference
- local deployment
- local data privacy

instead of cloud-based AI infrastructure.

---

## Why This Decision Was Made

Cloud AI systems introduce:
- recurring cost
- latency
- privacy concerns
- external dependency

The goal was proving that:
- practical AI systems can run locally
- strong coding assistants do not require massive infrastructure
- consumer hardware can support useful GenAI workflows

---

# 11. GPU Memory Optimization Strategy

## Techniques Used

To make training possible on limited hardware:
- 4-bit quantization
- gradient checkpointing
- gradient accumulation
- PEFT training
- sequence length filtering
- low batch sizes

were all combined strategically.

---

## Result

Training remained stable within:
```text
~7.2 GB VRAM usage
```

on an 8 GB GPU.

---

# 12. Engineering Philosophy Behind the Project

The project was designed around practical AI engineering constraints:
- limited hardware
- efficient inference
- reproducibility
- deployability
- optimization
- cost efficiency

The focus was not only on training a model, but on building a complete:
- training pipeline
- optimization workflow
- deployment architecture
- local inference system

capable of running in real-world environments.

---

# Key Engineering Learnings

This project provided deep practical understanding of:
- PEFT architectures
- quantization systems
- VRAM optimization
- local inference infrastructure
- tokenizer-aware preprocessing
- deployment formats
- model compression
- efficient GenAI engineering
- resource-constrained LLM development