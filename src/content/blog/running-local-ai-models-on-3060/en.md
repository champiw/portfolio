---
title: "Running local AI models on an RTX 3060"
description: "Optimizing llama.cpp and Qwen3.6 MoE on a 12 GB RTX 3060."
date: "2026-07-30"
tags:
    - NixOS
    - Homelab
    - AI
---
## Objectives 

The main goal is to build a local AI setup capable of running open-source alternatives to tools such as Claude Code on my existing gaming PC so i can test these new tools. I also wanted to keep enough resources available to continue using my graphical desktop while the model was running, and make the AI stack easy to enable or disable through my NixOS configuration.

## Running local AI on consumer hardware

One of the common assumptions about running large language models locally is that you need a flagship GPU with 24 GB or more of VRAM. While that certainly helps, modern Mixture-of-Experts (MoE) models make it possible to run surprisingly capable models on much more modest hardware. For this test project that's more than enough for me.

**Hardware used:**

* GPU: NVIDIA RTX 3060 (12 GB)
* CPU: AMD Ryzen 7 5800X
* RAM: 32 GB DDR4
* OS: NixOS

## NixOS setup

I wanted the setup to be declarative and modular so that changing models, inference settings or even the inference server would require minimal changes.

For inference I'm using **llama.cpp**, with **llama-server** exposing an OpenAI-compatible API. This allows tools such as OpenCode and other agent frameworks to connect to the same model without each loading it independently.

The configuration is split into several files:

* **default.nix** – Imports the modules required for this feature. Only this file is imported from the host configuration to keep it clean.
* **llama.nix** – Installs `llama.cpp`, enables the `llama-server` systemd service and configures the server.
* **profile.nix** – Contains the model path and inference parameters. Keeping this separate makes it easy to swap models or maintain multiple profiles.
* **opencode.nix** – Installs OpenCode.

This structure makes it easy to maintain different profiles for coding, general chat or experimentation by simply changing the imported profile.

## Choosing and optimizing the model

After trying several models, I settled on **Qwen3.6-35B-A3B** in **Q4_K_M** quantization.

The model includes an integrated MTP (Multi-Token Prediction) draft model, allowing speculative decoding without loading a separate draft model. This significantly improves generation speed while remaining within the 12 GB VRAM limit of the RTX 3060.

My initial configuration achieved approximately:

* Prompt processing: **~62 tokens/s**
* Generation: **~40 tokens/s**

After experimenting with different launch parameters, CPU thread counts, KV cache settings and speculative decoding options, I managed to improve the performance a little bit:

* Prompt processing: **~65 tokens/s**
* Generation: **~45 tokens/s**

The final configuration uses around **8 GB of VRAM**, **2 GB of system RAM**, and keeps both the CPU and GPU at roughly **50% utilization** during generation. This leaves enough headroom to continue using the desktop comfortably while the model is running.

## OpenCode

Once `llama-server` is running, integrating OpenCode is straightforward thanks to its OpenAI-compatible API.

To connect OpenCode to the local model, simply add an OpenAI-compatible provider pointing to the address where `llama-server` is running (for example, `http://127.0.0.1:8080`) and select the model name configured on the server. From that point on, OpenCode will use the local model for all requests without requiring any further configuration.

OpenCode acts as an agent capable of reading files, modifying them, executing commands and analysing the results using the model exposed by `llama-server`. This allows the model to remain loaded only once, while any compatible tool can reuse the same running instance.

## Future improvements

There are still a few things i'd like to do:

* If i have the oportunity i'd like to add my gpu to my home server so i can use its full capabilities.
* Experiment with different coding models as they become available.
* Try other tools like Hermes agent.
