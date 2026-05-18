# Custom AI Coding Assistant — vivesh-coder

## Project Overview

vivesh-coder is a specialized locally deployable Python coding assistant built by fine-tuning Meta's:

```text
Llama-3.2-3B
```

using QLoRA-based Parameter-Efficient Fine-Tuning (PEFT).

The project focuses on creating a lightweight, high-performance coding model capable of running efficiently on consumer-grade hardware while maintaining strong code generation quality.

The final system supports:
- local inference
- private code generation
- low-latency responses
- offline deployment
- Ollama integration
- REST API access

without requiring expensive cloud infrastructure or external API dependency.

---

# Core Objective

The primary objective of the project was to demonstrate that high-quality AI coding assistants can be:
- fine-tuned efficiently
- heavily compressed
- locally deployed
- cost-effective
- runnable on consumer GPUs

while still delivering useful real-world performance.

The project also explored:
- model optimization
- quantization pipelines
- local LLM deployment
- inference efficiency
- parameter-efficient fine-tuning

---

# Motivation

## Privacy

Most cloud coding assistants require sending source code to third-party servers.

This project explored a fully local deployment approach where:
- all inference remains on-device
- code never leaves the system
- users maintain full data control

---

## Cost Efficiency

Cloud LLM APIs can become expensive at scale.

The goal was to create:
- low-cost inference
- reusable local deployment
- zero recurring inference cost

using open-source infrastructure.

---

## Hardware Accessibility

Another major goal was proving that useful LLM systems can run on:
- laptops
- consumer GPUs
- small local environments

without requiring enterprise-scale infrastructure.

---

# Key Highlights

## Fine-Tuned LLM

- Base Model:
```text
meta-llama/Llama-3.2-3B
```

- Total Parameters:
```text
3.21 Billion
```

- Fine-Tuning Method:
```text
QLoRA (4-bit NF4 + LoRA)
```

---

## Parameter-Efficient Training

Only:
```text
~54 Million parameters
```

were trained, representing:
```text
1.68% of total parameters
```

This dramatically reduced:
- VRAM requirements
- training cost
- hardware constraints

while maintaining strong performance.

---

# Training Dataset

The model was trained on:
- CodeAlpaca-20k
- MBPP (Mostly Basic Python Problems)

Final filtered dataset:
```text
19,444 instruction-code samples
```

The dataset focused heavily on:
- Python programming
- instruction following
- code generation
- coding problem solving

---

# Training Performance

## Hardware

Training was completed on:

```text
NVIDIA RTX 4060 Laptop GPU (8 GB VRAM)
```

---

## Results

| Metric | Value |
|---|---|
| Training Time | 4h 54m |
| Final Loss | ~0.80 |
| Token Accuracy | 77.9% |
| Peak VRAM Usage | ~7.2 GB |
| Trainable Parameters | ~54M |

---

# Quantization & Compression

The model underwent:
- GGUF conversion
- Q4_K_M quantization

to optimize local inference.

---

## Compression Results

| Stage | Size |
|---|---|
| Original FP16 Model | ~6.0 GB |
| Final Q4_K_M Model | 1.88 GB |

Compression achieved:
```text
68.6% size reduction
```

while preserving strong inference quality.

---

# Local Deployment Architecture

The final model was deployed using:

```text
Ollama
```

This enabled:
- local CLI execution
- REST API access
- lightweight deployment
- simplified inference management

---

# API Integration

The deployed model supports:
- local REST APIs
- direct prompt generation
- backend integration
- CLI usage

This allows the model to be integrated into:
- AI applications
- autonomous systems
- developer tools
- local copilots
- coding assistants

---

# Engineering Focus Areas

The project focused heavily on:
- efficient LLM fine-tuning
- PEFT architectures
- quantization
- inference optimization
- low-resource AI engineering
- local deployment
- model compression
- production-oriented LLM workflows

---

# Technologies Used

## AI & Training
- PyTorch
- Transformers
- PEFT
- TRL
- bitsandbytes
- CUDA

---

## Quantization & Inference
- llama.cpp
- GGUF
- Q4_K_M quantization
- Ollama

---

## Datasets
- CodeAlpaca-20k
- MBPP

---

# Key Learnings

This project provided hands-on experience in:
- LLM fine-tuning
- QLoRA training
- low-VRAM optimization
- quantization pipelines
- inference deployment
- local AI infrastructure
- tokenizer-aware preprocessing
- GPU memory optimization
- production-style model serving

---

# Outcome

The project successfully demonstrated that:
- modern LLMs can be specialized efficiently
- strong coding assistants can run locally
- quantization can dramatically reduce deployment cost
- consumer hardware can support practical GenAI systems

The final system represents a complete end-to-end LLM engineering pipeline from:
- dataset preparation
- training
- optimization
- quantization
- deployment
- API serving
```