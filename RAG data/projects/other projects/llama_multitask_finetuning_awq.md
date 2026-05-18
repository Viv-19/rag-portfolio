# LLaMA 3.2 3B — Multi-Task Fine-Tuning & AWQ Quantization

## Overview

This project implements a complete end-to-end pipeline for:
- fine-tuning
- merging
- quantizing
- deploying

Meta’s:
```text
LLaMA 3.2 3B
```

using:
- QLoRA
- LoRA adapters
- AWQ 4-bit quantization

The system transforms the base LLM into a lightweight multi-task instruction-following model capable of:
- scientific summarization
- persona roleplay
- conversational generation

while remaining deployable on:
```text
consumer-grade hardware
```

with only:
```text
~3 GB VRAM
```

required for inference.

---

# Objective

The objective of the project was to explore:
```text
practical low-resource LLM fine-tuning and deployment
```

through:
- parameter-efficient training
- LoRA merging
- aggressive model compression
- quantized inference optimization

while preserving:
- response quality
- instruction-following capability
- deployment efficiency

---

# Core Features

## Multi-Task Fine-Tuning

The model was trained on:
- summarization tasks
- persona roleplay tasks
- conversational instruction-following

using a unified:
```text
instruction-tuning format
```

---

## QLoRA-Based Training

The project used:
```text
QLoRA + 8-bit quantization
```

to fine-tune:
```text
LLaMA 3.2 3B
```

efficiently on:
```text
Google Colab T4 GPUs
```

without requiring high-end enterprise hardware.

---

## LoRA Adapter Merging

After training:
- LoRA adapters were merged back into the base model
- standalone inference models were generated
- adapter-only inference dependency was removed

---

## AWQ 4-Bit Quantization

The merged model was compressed using:
```text
AWQ (Activation-aware Weight Quantization)
```

to produce:
```text
a lightweight 2.1 GB inference model
```

optimized for:
- low VRAM inference
- deployment efficiency
- fast local execution

---

## Consumer Hardware Deployment

The final model:
- runs on ~3 GB VRAM
- supports efficient inference
- preserves strong instruction-following quality

while achieving:
```text
5.7× compression
```

from the original FP32 model.

---

# Architecture

The project follows a:
```text
3-Phase LLM Engineering Pipeline
```

covering:
1. Dataset Preparation
2. QLoRA Fine-Tuning
3. Merge + AWQ Quantization

---

# Pipeline Overview

```text
Raw Datasets
      ↓
Dataset Formatting
      ↓
QLoRA Fine-Tuning
      ↓
LoRA Adapters
      ↓
Merge Into Base Model
      ↓
AWQ Quantization
      ↓
Deployment-Ready 4-bit Model
```

---

# Dataset Preparation

## Training Tasks

The model supports:
- summarization
- persona roleplay
- conversational responses

---

# Datasets Used

| Dataset | Purpose |
|---|---|
| ArXiv Summarization | Scientific summarization |
| SamSum | Conversational summarization |
| Chandler Bing Dataset | Persona roleplay |

---

# Persona Dataset Generation

A custom script:
```text
generate_chandler.py
```

was used to create:
```text
241 Chandler Bing persona samples
```

to simulate:
- humor
- sitcom-style conversational behavior
- personality-driven responses

---

# Unified Training Format

All datasets were converted into:
```json
{
  "instruction": "...",
  "input": "...",
  "output": "..."
}
```

instruction-following format.

---

# Fine-Tuning Architecture

## Base Model

```text
meta-llama/Llama-3.2-3B
```

---

# Fine-Tuning Strategy

The model used:
```text
QLoRA (Quantized Low-Rank Adaptation)
```

to minimize:
- VRAM usage
- trainable parameters
- compute requirements

---

# Quantization During Training

The base model was loaded using:
```python
load_in_8bit=True
```

through:
```text
bitsandbytes
```

to reduce memory usage during training.

---

# LoRA Configuration

| Parameter | Value |
|---|---|
| Rank (r) | 6 |
| Alpha | 8 |
| Dropout | 0.05 |

---

# Target Modules

LoRA adapters were applied to:
- q_proj
- k_proj
- v_proj
- o_proj
- gate_proj
- up_proj
- down_proj

---

# Training Infrastructure

## Hardware

Training was performed on:
```text
Google Colab T4 GPU
```

with:
```text
15 GB VRAM
```

---

# Training Libraries

The pipeline used:
- Transformers
- PEFT
- TRL
- bitsandbytes
- datasets
- accelerate

---

# Training Configuration

| Parameter | Value |
|---|---|
| Batch Size | 1 |
| Gradient Accumulation | 8 |
| Effective Batch Size | 8 |
| Epochs | 3 |
| Learning Rate | 2e-5 |
| Scheduler | Cosine |
| Max Sequence Length | 512 |

---

# Gradient Checkpointing

Enabled:
```text
gradient checkpointing
```

to reduce:
- VRAM pressure
- activation memory usage

during fine-tuning.

---

# Training Results

| Metric | Value |
|---|---|
| Training Samples | 758 |
| Validation Samples | 85 |
| Final Train Loss | 2.1546 |
| Final Eval Loss | 2.2194 |
| Training Time | ~1h 42m |
| Adapter Size | ~18 MB |

---

# Overfitting Analysis

The:
```text
small train/eval loss gap
```

indicated:
- stable convergence
- minimal overfitting
- healthy generalization

during fine-tuning.

---

# Merge & Quantization Pipeline

## LoRA Merge

After training:
- LoRA weights were merged into the base model
- standalone inference weights were generated
- dependency on external adapters was removed

using:
```python
model.merge_and_unload()
```

---

# AWQ Quantization

The merged model was compressed using:
```text
AWQ 4-bit Quantization
```

through:
```text
AutoAWQ
```

---

# AWQ Configuration

| Parameter | Value |
|---|---|
| Weight Bits | 4 |
| Group Size | 128 |
| Zero Point | True |
| Backend | GEMM |

---

# Quantization Calibration

The AWQ pipeline used:
```text
pileval calibration dataset
```

containing:
```text
214,670 samples
```

to optimize:
- activation-aware scaling
- quantization stability
- inference quality

---

# Model Compression Results

| Model Version | Size |
|---|---|
| Original FP32 | ~12 GB |
| 8-bit Training Model | ~6.4 GB |
| FP16 Merged Model | ~6.4 GB |
| Final AWQ 4-bit Model | ~2.1 GB |

---

# Compression Outcome

The final pipeline achieved:
```text
5.7× size reduction
```

while maintaining:
- coherent summarization
- persona consistency
- instruction-following capability

---

# Inference Capabilities

## Summarization

The model successfully:
- summarized conversations
- condensed scientific text
- generated coherent outputs

---

## Persona Roleplay

The model demonstrated:
- Chandler Bing personality emulation
- sitcom-style conversational tone
- humor-oriented responses

---

# Deployment

The final model can be deployed using:
- AutoAWQ
- Transformers
- HuggingFace ecosystem

on:
```text
consumer GPUs
```

with:
```text
~3 GB VRAM
```

---

# Technology Stack

## LLM Training
- Transformers
- PEFT
- TRL
- bitsandbytes

---

## Quantization
- AutoAWQ
- AWQ 4-bit Quantization

---

## Dataset Processing
- HuggingFace Datasets
- JSONL pipelines

---

## Hardware
- Google Colab T4 GPU

---

# Engineering Challenges

## Low-VRAM Fine-Tuning

Training a 3B parameter model on:
```text
15 GB VRAM
```

required:
- QLoRA
- gradient checkpointing
- 8-bit loading
- low-rank adaptation

to remain memory efficient.

---

## Multi-Task Instruction Alignment

Combining:
- summarization
- persona roleplay
- instruction-following

required:
- standardized prompt formatting
- unified instruction templates
- balanced dataset preparation

to prevent:
- catastrophic forgetting
- task imbalance

---

## Quantization Quality Preservation

Aggressive:
```text
4-bit compression
```

risked:
- output degradation
- hallucinations
- unstable inference

AWQ calibration significantly improved:
- activation preservation
- quantized stability
- inference quality

---

# Key Learnings

This project provided practical experience in:
- LLM fine-tuning
- QLoRA training
- PEFT workflows
- LoRA merging
- AWQ quantization
- model compression
- low-VRAM training
- instruction tuning
- inference optimization
- deployment-oriented AI engineering

---

# Outcome

This project successfully demonstrates:
```text
the complete lifecycle of production-oriented LLM engineering
```

from:
- raw datasets
- fine-tuning
- parameter-efficient adaptation
- quantization
- deployment optimization

to:
```text
lightweight consumer-grade AI deployment
```

while maintaining:
- instruction-following quality
- coherent generation
- efficient inference
- strong compression efficiency