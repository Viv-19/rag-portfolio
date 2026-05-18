# Recruiter Summary — vivesh-coder

## Project Overview

vivesh-coder is a locally deployable AI coding assistant built by fine-tuning Meta’s:

```text
Llama-3.2-3B
```

using:
```text
QLoRA (Parameter-Efficient Fine-Tuning)
```

The project focused on building a lightweight, optimized coding model capable of running efficiently on consumer-grade hardware while maintaining strong code generation quality.

The final system supports:
- local inference
- private code generation
- Ollama deployment
- REST API integration
- real-time coding assistance

without depending on external AI APIs.

---

# What Makes This Project Strong

This project demonstrates practical understanding of:
- LLM fine-tuning
- quantization
- model optimization
- local inference systems
- deployment pipelines
- resource-constrained AI engineering

Rather than only using existing APIs, the project involved building a complete end-to-end LLM engineering pipeline.

---

# Key Technical Highlights

## Efficient Fine-Tuning

The model was trained using:
```text
QLoRA (4-bit NF4 + LoRA)
```

which enabled fine-tuning a:
```text
3.21B parameter model
```

on:
```text
8 GB VRAM consumer hardware
```

Only:
```text
1.68% of model parameters
```

were trained, dramatically reducing memory requirements.

---

## Quantization & Compression

The final model was:
- converted to GGUF format
- quantized using Q4_K_M

Result:
- original FP16 model: ~6 GB
- final deployment model: 1.88 GB

This achieved:
```text
68.6% compression
```

while maintaining strong generation quality.

---

## Local Deployment

The model was deployed using:
```text
Ollama
```

allowing:
- local inference
- REST API serving
- CLI execution
- offline usage

The system can run on:
```text
4 GB+ VRAM hardware
```

making deployment practical and affordable.

---

# Dataset & Training

The training pipeline used:
- CodeAlpaca-20k
- MBPP datasets

Final dataset size:
```text
19,444 filtered instruction-code samples
```

Training configuration included:
- QLoRA
- 4-bit NF4 quantization
- gradient checkpointing
- PEFT optimization
- tokenizer-aware filtering

---

# Engineering Challenges Solved

The project involved solving several real engineering problems:
- CUDA OOM issues
- VRAM optimization
- quantization tradeoffs
- dataset standardization
- training stability
- local inference optimization
- deployment compatibility

---

# Technologies Used

## AI & Training
- PyTorch
- Hugging Face Transformers
- PEFT
- TRL
- bitsandbytes

## Quantization & Inference
- llama.cpp
- GGUF
- Ollama

## Deployment
- REST APIs
- local model serving
- CLI integration

---

# Skills Demonstrated

This project demonstrates strong understanding of:
- LLM engineering
- fine-tuning pipelines
- quantization systems
- GPU memory optimization
- local inference infrastructure
- deployment engineering
- model compression
- PEFT architectures
- practical GenAI workflows

---

# Overall Impact

The project demonstrates the ability to:
- build complete LLM pipelines
- optimize AI systems under hardware constraints
- deploy practical local GenAI applications
- combine model training with production deployment

It reflects strong hands-on experience in applied AI engineering beyond simple API-based AI applications.