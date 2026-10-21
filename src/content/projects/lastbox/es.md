---
title: "LastBox"
description: "Aplicación self-hosted que ayuda al seguimiento de suministros para personas con diabetes tipo 1."
date: "2026-10-20"
tags:
    - Django
    - Desarrollo Web
github: "https://github.com/champiw/lastbox"
---

## ¿Por qué se creó LastBox?

Las personas que siguen una terapia continua con insulina tienen ciertos suministros que deben controlar periódicamente, por lo que el objetivo de este proyecto es hacerlo lo mas fácil posible.

Los diabéticos tipo 1, en particular, consumen suministros en calendarios semi previsibles. Esta app ofrece una forma sencilla de tener una visión general de cuántos suministros se tienen en cada momento y cuánto tiempo durarían.

## Funciones clave

### Panel principal

Una visión general que permite marcar rápidamente los suministros como utilizados, y una vista de 14 días da un resumen de los próximos cambios de suministros.

![dashboard](./images/dashboard.png)

### Calendario

El calendario visualiza los cambios de suministros a lo largo de los meses. Aparecen marcadores en las fechas en las que se espera que cambien los suministros, ayudando a los usuarios a planificar con antelación.

![calendar](./images/calendar.png)

### Página para añadir separada

Para evitar saturar el panel principal, la forma de añadir nuevos suministros se separó a una interfaz distinta, accesible desde la barra superior o desde el enlace junto a las tarjetas de suministros.

![add page](./images/add_page.png)

## El Stack usado

El objetivo principal de este proyecto era repasar mis conocimientos de Django, y elegí la configuración con la que me siento más cómodo.

- **Django 5.2** con Python 3.11
- **SQLite** (base de datos en un único archivo; sin servicios externos)
- **Gunicorn** con WhiteNoise para servir archivos estáticos
- **Docker Compose** para la contenerización
- **Módulo de NixOS** para despliegue declarativo (opcional, pero útil)

Todas las decisiones de diseño giran en torno a la idea de que se trata de una herramienta pequeña, personal y local, así que quería mantener las dependencias innecesarias al mínimo.

La aplicación entera se ejecuta en un servidor doméstico, accesible desde la red local o una VPN. Sin nube, sin cuentas en servidores de terceros. El usuario tiene control total sobre cómo servir la aplicación fuera de su red doméstica.

## Despliegue: clonar y ejecutar

Uno de los objetivos de diseño de LastBox es un despliegue sin fricción. Clona el repositorio y ejecuta un único script:

```bash
git clone <repo> lastbox
cd lastbox
./deploy.sh
```

Eso es todo. El script de despliegue genera una clave secreta, crea directorios, compila la imagen de Docker y levanta la pila en el puerto 8010. Los datos persisten en `data/db.sqlite3`.

Las instrucciones detalladas para el despliegue se encuentran en el [repositorio](https://github.com/champiw/lastbox).

#### Soporte para NixOS

Mi servidor personal usa NixOS, así que añadí un módulo declarativo de Nix.

Añádelo a tu configuración, apunta al directorio del repositorio y systemd se encarga del ciclo de vida de Docker Compose:

```nix
services.lastbox = {
  enable = true;
  directory = "/srv/lastbox";
  port = 8010;
  openFirewall = true;
};
```

El módulo usa una unidad systemd de tipo oneshot con `--build` al reiniciar, así que un `nixos-rebuild` tras un `git pull` aplica los cambios automáticamente.

### Futuras implementaciones

LastBox está pensado para un caso de uso concreto: trackear los suministros de diabetes con el mínimo esfuerzo. Si usas un tratamiento con bomba de insulina y estás cansado de gestionar varias aplicaciones o hojas de cálculo, puede valer la pena probarlo.

La base de código es pequeña, el stack es simple y el despliegue es fácil. Ese es el objetivo.

Hoy por hoy, es una versión temprana con solo las herramientas básicas necesarias para mantener un inventario sencillo. Con el tiempo seguiré añadiendo nuevas funciones que considere útiles para cualquier usuario.

*LastBox es un proyecto personal. Si lo encuentras útil o tienes ideas, revisa el [repositorio](https://github.com/champiw/lastbox).*