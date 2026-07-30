---
title: "Ejecutando modelos de IA locales en una RTX 3060"
description: "Optimizando llama.cpp y Qwen3.6 MoE en una RTX 3060 de 12 GB."
date: "2026-07-30"
tags:
    - NixOS
    - Homelab
    - IA

---

## Objetivos 

El objetivo principal es montar un entorno de IA local capaz de ejecutar alternativas de código abierto a herramientas como Claude Code en mi PC gaming, para poder probar este tipo de herramientas. También quería dejar suficientes recursos disponibles para poder seguir utilizando el escritorio gráfico mientras el modelo estuviera ejecutándose, además de que toda la configuración fuese fácil de activar o desactivar desde mi configuración de NixOS.

## Ejecutando IA local en hardware de consumidor

Una de las ideas más extendidas sobre los modelos de inteligencia artificial es que se necesita una GPU de gama alta con 24 GB o más de VRAM para poder ejecutarlos de forma local. Aunque eso ayuda, los modelos modernos de tipo Mixture-of-Experts (MoE) permiten obtener resultados bastante buenos con hardware mucho más modesto. Para este proyecto de pruebas, es más que suficiente.

**Hardware utilizado:**

* GPU: NVIDIA RTX 3060 (12 GB)
* CPU: AMD Ryzen 7 5800X
* RAM: 32 GB DDR4
* OS: NixOS

## Configuración en NixOS

Quería que toda la configuración fuese declarativa y modular, de forma que cambiar de modelo, modificar las flags o incluso sustituir el servidor de inferencia requiriese el mínimo número posible de cambios.

Para la inferencia utilizo **llama.cpp**, mientras que **llama-server** expone una API compatible con OpenAI. Esto permite que herramientas como OpenCode u otros agentes puedan conectarse al mismo modelo sin necesidad de cargarlo de forma independiente.

La configuración está dividida en varios archivos:

* **default.nix** – Importa los módulos necesarios para esta funcionalidad. Es el único archivo que importo desde la configuración del host para mantenerla limpia.
* **llama.nix** – Instala `llama.cpp`, habilita el servicio `llama-server` de systemd y configura el servidor.
* **profile.nix** – Contiene la ruta del modelo y los parámetros de inferencia. Mantener esta configuración separada facilita cambiar de modelo o disponer de varios perfiles.
* **opencode.nix** – Instala OpenCode.

Esta estructura facilita mantener distintos perfiles para programación, chat o pruebas simplemente cambiando el perfil importado.

## Elección y optimización del modelo

Después de probar varios modelos, terminé eligiendo **Qwen3.6-35B-A3B** con cuantización **Q4_K_M**.

El modelo incluye un modelo auxiliar MTP (Multi-Token Prediction) integrado, lo que permite utilizar decodificación especulativa sin necesidad de cargar un segundo modelo independiente. Esto mejora considerablemente la velocidad de generación manteniéndose dentro del límite de 12 GB de VRAM de la RTX 3060.

Mi configuración inicial obtenía aproximadamente:

* Procesamiento del prompt: **~62 tokens/s**
* Generación: **~40 tokens/s**

Tras experimentar con distintos parámetros de lanzamiento, número de hilos de CPU, configuración de la caché KV y opciones de decodificación especulativa, conseguí mejorar ligeramente el rendimiento:

* Procesamiento del prompt: **~65 tokens/s**
* Generación: **~45 tokens/s**

La configuración final utiliza alrededor de **8 GB de VRAM**, **2 GB de RAM del sistema** y mantiene tanto la CPU como la GPU en torno al **50 % de utilización** durante la generación. Esto deja margen suficiente para seguir utilizando el escritorio con normalidad mientras el modelo está en uso.

## Opencode

Una vez que llama-server está en funcionamiento, integrar OpenCode resulta muy sencillo gracias a la API compatible con OpenAI.

Para conectar OpenCode con el modelo local, basta con añadir un proveedor compatible con OpenAI apuntando a la dirección donde está ejecutándose `llama-server` (por ejemplo, `http://127.0.0.1:8080`) y seleccionar el nombre del modelo configurado en el servidor. A partir de ese momento, OpenCode utilizará el modelo local para todas las solicitudes sin necesidad de realizar cambios adicionales.

OpenCode actúa como un agente capaz de leer archivos, modificarlos, ejecutar comandos y analizar los resultados utilizando el modelo que expone llama-server. De esta forma, el modelo permanece cargado una única vez y cualquier herramienta compatible puede reutilizar la misma instancia.

## Mejoras futuras

Todavía hay algunas cosas que me gustaría hacer:

* Si tengo la oportunidad, me gustaría trasladar la GPU a mi home server para poder aprovechar toda su capacidad.
* Probar distintos modelos orientados a programación conforme vayan apareciendo.
* Experimentar con otras herramientas, como Hermes agent.

