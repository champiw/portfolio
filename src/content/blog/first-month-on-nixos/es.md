---
title: "Mi primer mes en NixOS"
description: "Cómo pasé de usar Windows, a usar NixOS en todos mis ordenadores."
date: "2026-07-4"
tags:
    - NixOS
    - Homelab
---

## Qué es NixOS

NixOS es una distribución de Linux basada en el gestor de paquetes Nix. En lugar de configurar tu sistema editando archivos manualmente o instalando paquetes uno por uno, describes todo tu sistema en un archivo de configuración nix. NixOS luego construye tu sistema a partir de esa configuración, lo que facilita su reproducción y actualización. Además, cada vez que construyes el sistema, se crea una nueva generación y puedes volver a una anterior si algo sale mal.

## Experiencia previa en Linux

Personalmente siempre he tenido un conocimiento superficial sobre Linux. Nunca aprendí qué partes componen un sistema usable o por qué existen diferentes distribuciones de Linux hasta hace poco, ya que hasta este momento he usado Windows. Sí que usé Linux ocasionalmente, pero no en mi sistema principal.

He usado Debian durante mis clases, donde aprendí a usar la terminal y algunas nociones básicas de Linux, usuarios y permisos, estructura de archivos, etc.

Después usé Arch en dualboot, pero con un script de instalación que encontré en GitHub, por lo que no sabía lo que se estaba instalando ni qué estaba pasando la mayor parte del tiempo.

Después de eso decidí borrar Arch y cambiarlo por  Debian, con el que me sentía más seguro para  usarlo cuando lo necesitaba.

Esto me lleva al momento en el que descubrí NixOS y todas sus características, que me parecieron bastante interesantes, así que decidí darle una oportunidad.

## Primera instalación

Muchas personas instalan NixOS en una máquina virtual para hacer su configuración y hacer pruebas antes de instalarlo. En mi caso, usé un portátil que no estaba usando y que quería usar para un servidor en el futuro. Antes de eso, sin embargo, hice una configuración de escritorio básica, para tener una base para cuando lo instalara en mi ordenador principal.

Intenté mantenerlo simple y no usar librerías extra que no entendiera. Solo usé flakes para poder tener tanto el servidor como el escritorio y poder elegir entre ambos.

### Compartir pantalla en Wayland

Un problema bastante tonto que tuve durante esta primera configuración de escritorio fue hacer que funcionaran los portales para compartir pantalla. Decidí usar Niri como gestor de ventanas, que está basado en Wayland por lo que hacen falta estos portales. El problema está en que intenté usar diferentes LLMs para que me guiaran en la instalación general, así que no abrí la guía de instalación de Niri, que fue el mayor error, y tuve que aprenderlo por las malas.

Mi portal de GNOME no arrancaba, por culpa de un error de dependencias, así que probé todo lo que encontré para arreglarlo, incluyendo volver a usar LLMs. Pasé 3-4 días con este problema, y en retrospectiva, era tan simple de arreglar como seguir la guía de instalación del propio Niri y leerla con atención.

El problema era cómo estaba iniciando Niri. Usé un login manager muy mínimo que usaba la TTY, así que siguiendo la documentación de Niri, en este caso tenía que añadir el comando `niri-session`. Una vez hice este cambio, todo funcionó y eliminé todas las soluciones raras que había intentado hacer antes.

Así que dos lecciones aprendidas en la primera semana: leer la documentación y no confiar ciegamente en las LLMs, lo cual debería haber sido obvio desde el principio.

### Inicios de mi servidor personal

Después de ese incidente, apliqué lo que había aprendido y ampliar mi configuración se hizo más fácil. Conseguí tener una configuración de escritorio para usar de base más adelante, así que pasé al servidor.

Decidí dejar mi portátil como un homelab donde planeaba alojar servicios que uso regularmente. Aquí aprendí lo fácil que es añadir servicios a NixOS y lo fácil que es conseguir una configuración funcional que se sienta estable y reproducible.

Expuse un disco externo a través de Samba para actuar como NAS y poder hacer copias de seguridad desde mi escritorio Windows antes de hacer el cambio. También añadí Jellyfin para alojar mi biblioteca de música y acceder desde mi pc de escritorio y mi teléfono. Y por último, añadí Syncthing para sincronizar mi bóveda de Obsidian.

Algunas cosas que quiero mejorar en el futuro son conseguir un NAS multibahía real, ya que ahora solo estoy usando un disco y, si falla, perdería todos mis datos. E investigar cómo exponer de forma segura ciertos servicios como Syncthing y Jellyfin fuera de la red local para poder acceder en cualquier lugar.

## Saltando de cabeza

Aquí es cuando instalé NixOS en mi ordenador principal, formateando todos mis discos, e instalando el sistema operativo en mi primer diso nvme.

Tener una configuración básica ya hecha hizo esta parte más fácil. Simplemente empecé a añadir nuevos programas al sistema según los necesitaba: OBS, Obsidian, etc.

### Flakes y estructuración de la configuración

Como ahora tengo tanto mi servidor como mi ordenador principal en la misma configuración, me tomé 1-2 días para pensar en distintos enfoques sobre cómo quiero estructurar mi configuración. También curioseé por GitHub las configuraciones de otros usuarios de NixOS para ver cómo lo hacían otras personas. Noté que muchos de ellos usaban Home Manager o herramientas similares para también tener la configuración de cada aplicación, de lo cual tomé nota para añadir más adelante.

Al final decidí tener algo parecido a esto:

- hosts
    - host-name
        - default.nix
        - hardware.nix
- modules
    - base
        - Configuraciones base para todos los hosts
    - desktop
        - Configuración de Niri y Noctalia
    - hardware
        - Controladores de Nvidia y audio
    - network
        - Añadir almacenamiento de red y otras configuraciones al sistema
    - programs
        - Todos mis programas instalados (Steam, OBS, VS Code, Neovim)
    - services
        - Todos mis servicios alojados (Jellyfin, Syncthing)
- flake.nix
- flake.lock

Cada sistema tiene una carpeta en "hosts" donde se eligen y se importan los archivos de la carpeta "modules" para añadir las funciones que quiera en cada máquina.

### Objetivo para Home Manager

Home Manager es un sistema para configurar el ecosistema del usuario, por ejemplo instalar programas y gestionar dotfiles.

Home manager es una parte importante para poder conseguir lo que quiero que sea mi configuración. Una vez que importe un módulo de una aplicación, quiero que instale la aplicación en el sistema y la configure como yo quiero, todo en el mismo archivo.

Así que mi solución fue mezclar configuraciones del sistema de NixOS y opciones de Home Manager en los mismos archivos. Quizá no sea la mejor práctica, pero funciona para mí y creo que está lo bastante organizado como para no ser un problema. Quizá cambie de opinión sobre esto cuando tenga más experiencia con esta distribución.

## Sistema actual

Ahora mismo tengo una configuración funcional en la que me siento cómodo y puedo hacer todo lo necesito de forma cómoda.

[¡Aquí está el enlace al repositorio!](https://github.com/champiw/.dotfiles)

Algunas cosas que todavía necesito terminar o añadir en el futuro:

- Configurar aplicaciones usando Home Manager de forma declarativa
- Crear una configuración de Neovim
- Aplicar un tema de colores en todo el sistema
- Añadir un dualboot con windows ya que algunas apps no son compatibles en linux
