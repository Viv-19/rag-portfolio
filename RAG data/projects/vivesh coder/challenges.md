# Engineering Challenges & Solutions

Building `vivesh-coder` involved several practical engineering and infrastructure challenges related to:
- GPU memory constraints
- model optimization
- dataset quality
- quantization
- local inference
- training stability

This document outlines the key problems encountered and how they were solved.

---

# 1. GPU Memory Constraints (OOM Errors)

## Challenge

The biggest initial challenge was training a:
```text
3B parameter LLM
```

on:
```text
NVIDIA RTX 4060 Laptop GPU (8 GB VRAM)
```

Without optimization, training quickly resulted in:
```text
CUDA Out Of Memory (OOM)
```

errors.

The largest VRAM bottlenecks were:
- long sequence lengths
- FP16 model loading
- optimizer states
- gradient storage
- attention computation

---

## Solution

A combination of optimization strategies was implemented:

### Memory Optimizations
- QLoRA 4-bit loading
- NF4 quantization
- gradient checkpointing
- gradient accumulation
- low batch sizes
- 512-token filtering

---

## Result

The training pipeline stabilized at:
```text
~7.2 GB VRAM usage
```

making the project runnable on consumer hardware.

---

# 2. Long Sequence Instability

## Challenge

Long instruction-response samples caused:
- VRAM spikes
- truncation issues
- unstable training
- slower throughput

Some training examples exceeded practical GPU limits.

---

## Solution

Implemented strict:
```text
512-token maximum filtering
```

during preprocessing.

This ensured:
- stable batching
- predictable memory usage
- reduced training instability
- faster iteration speed

---

## Tradeoff

This reduced long-context training exposure but dramatically improved:
- reliability
- reproducibility
- training stability

---

# 3. Dataset Standardization Problems

## Challenge

The datasets:
- CodeAlpaca
- MBPP

used different formatting styles and structures.

Without standardization:
- prompts became inconsistent
- instruction formatting varied
- response behavior degraded

---

## Solution

Created a unified instruction-tuning schema:

```text
Instruction
Input
Response
```

All datasets were transformed into the same conversational structure before training.

---

## Result

This improved:
- response consistency
- instruction-following behavior
- prompt alignment
- generation quality

---

# 4. Training Stability During QLoRA

## Challenge

QLoRA training introduced several stability concerns:
- gradient instability
- optimizer sensitivity
- learning rate tuning
- VRAM fragmentation

Incorrect hyperparameters caused:
- unstable loss curves
- degraded outputs
- noisy generation

---

## Solution

Careful tuning was performed for:
- learning rate
- LoRA rank
- gradient accumulation
- scheduler configuration

Final stable configuration:
- learning rate: `2e-4`
- LoRA rank: `16`
- alpha: `32`
- dropout: `0.05`

---

## Result

Training converged successfully:
```text
Final Loss ≈ 0.80
```

with:
```text
77.9% token accuracy
```

---

# 5. Merging LoRA Adapters Correctly

## Challenge

After training, the LoRA adapters existed separately from the base model.

Incorrect merging caused:
- corrupted outputs
- incompatible checkpoints
- inference failures

---

## Solution

Used:
```python
model.merge_and_unload()
```

to safely merge adapter weights into the FP16 base model before conversion.

---

## Result

Produced a standalone deployable model compatible with:
- GGUF conversion
- llama.cpp
- Ollama deployment

---

# 6. GGUF Conversion Compatibility

## Challenge

Converting HuggingFace checkpoints into:
```text
GGUF
```

format introduced compatibility issues.

Potential problems included:
- tokenizer mismatches
- broken metadata
- unsupported tensor structures

---

## Solution

Used the official:
```text
convert_hf_to_gguf.py
```

tool from:
```text
llama.cpp
```

to ensure format consistency.

Validation was performed after conversion to verify:
- tokenizer integrity
- inference correctness
- model loading stability

---

# 7. Choosing the Right Quantization Strategy

## Challenge

Aggressive quantization reduced model quality significantly.

Lower quantization methods:
- increased hallucinations
- reduced code correctness
- destabilized outputs

---

## Solution

Tested multiple quantization strategies:
- FP16
- Q8_0
- Q4_0
- Q4_K_M

Finally selected:
```text
Q4_K_M
```

because it provided the best balance between:
- model size
- inference speed
- quality retention

---

## Final Outcome

| Type | Size | Relative Quality |
|---|---|---|
| FP16 | 6.0 GB | 100% |
| Q4_K_M | 1.88 GB | ~95% |

---

# 8. Local Inference Optimization

## Challenge

The final model needed to:
- run locally
- support low VRAM systems
- provide real-time inference
- remain usable on consumer hardware

Large models often suffer from:
- slow token generation
- excessive memory usage
- startup latency

---

## Solution

Optimizations included:
- GGUF conversion
- Q4_K_M quantization
- Ollama deployment
- low-memory inference pipeline

---

## Result

The final system achieved:
- real-time generation
- lightweight deployment
- stable local inference
- practical usability on laptops

---

# 9. Reproducibility & Pipeline Management

## Challenge

LLM pipelines can become difficult to reproduce due to:
- multiple preprocessing stages
- model conversion steps
- dependency mismatches
- quantization workflows

---

## Solution

The pipeline was organized into:
- modular scripts
- structured preprocessing
- reproducible conversion steps
- documented training configuration

The project included:
- scripts
- notebooks
- configuration files
- deployment instructions

---

# 10. Balancing Quality vs Hardware Constraints

## Challenge

The core engineering problem of the project was balancing:
- model quality
- training feasibility
- deployment size
- inference speed
- hardware limitations

Improving one area often negatively affected another.

---

## Solution

A balanced optimization approach was used:
- PEFT instead of full fine-tuning
- local embeddings avoided
- efficient quantization
- smaller but capable base model
- optimized sequence length
- lightweight inference stack

---

# Engineering Perspective

One of the most important lessons from this project was understanding that practical AI engineering is heavily constrained by:
- infrastructure
- memory
- deployment
- optimization
- tradeoffs

Building useful GenAI systems is not only about model capability, but also about:
- efficiency
- deployability
- reproducibility
- reliability
- real-world usability

This project provided practical experience in solving engineering problems under realistic hardware and deployment constraints.