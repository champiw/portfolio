---
title: "Creando una configuración de Neovim con vim.pack"
description: "Creando una configuración de Neovim desde cero usando el gestor de paquetes nativo."
date: "2026-08-07"
tags:
    - NixOS
    - Neovim
---

## ¿Por qué Neovim?

Durante los últimos años he utilizado principalmente Visual Studio Code.
Funciona muy bien y no tengo motivos para cambiar, pero siempre me ha
interesado Neovim y quería entender por qué tantos desarrolladores dedican
tiempo a aprenderlo y a configurar su entorno.

Me interesa mucho la idea de un editor de texto pensado para su uso con solo un
teclado. Llevo un tiempo utilizando una extensión de VS Code que emula algunos
aspectos de Vim, y uso un sistema similar en Obsidian.  Después de usarlas un
tiempo me he acostumbrado al funcionamiento de Vim y me parece muy cómodo
trabajar de esta manera, así que decidí probar a usar el editor en terminal.

En lugar de instalar una distribución ya preparada como LazyVim, NvChad o
AstroNvim, opté por crear una configuración propia que se adaptase a mis
necesidades. Decidí hacer la configuración de forma progresiva, entendiendo
cómo funciona cada parte y pudiendo personalizarla desde el principio.

Como utilizo NixOS, también quería que mi configuración fuese reproducible y
estuviese versionada junto con el resto de mis dotfiles.

## Objetivo de la configuración

Mi objetivo es crear una configuración ligera de Neovim aprovechando las nuevas
funcionalidades nativas introducidas en Neovim 0.12.

En lugar de depender de un gestor de plugins externo, utilizo `vim.pack` para
gestionar los plugins. Esto mantiene la configuración sencilla y, al mismo
tiempo, facilita la instalación, actualización y eliminación de plugins.

Por el momento, la configuración incluye:

* Ajustes básicos del editor y asignaciones de teclas.
* Soporte para LSP(Language Server Protocol) mediante `nvim-lspconfig`.
* Servidores de lenguaje para Nix, Lua, HTML, CSS, Tailwind CSS, Svelte y
  Docker.
* Treesitter para el resaltado de sintaxis.
* `blink.cmp` para el autocompletado basado en LSP.
* Un esquema de colores custom.
* Comandos personalizados `:PackUpdate`, `:PackDelete` y `:PackClean` para
  gestionar los plugins de forma más cómoda.

Uno de los primeros problemas que encontré fue que Treesitter se activaba para
todos los archivos. Neovim intentaba iniciar un parser para `netrw`, que no
existe, lo que provocaba errores cada vez que navegaba por directorios. La
solución fue limitar el autocomando únicamente a los lenguajes que realmente
tenía instalados. Después surgieron algunos problemas más relacionados con las
dependencias de ciertos plugins, pero fueron fáciles de resolver.

En este punto, la configuración ya ofrece todo lo que considero esencial:

* Diagnósticos proporcionados por los servidores de lenguaje.
* Formateo automático mediante LSP.
* Resaltado de sintaxis.
* Autocompletado.

Toda la configuración sigue estando contenida en un único archivo `init.lua`.
Cuando esté satisfecho con la funcionalidad y el proyecto siga creciendo, la
dividiré en módulos más pequeños para que resulte más fácil de mantener.

Puedes ver el código en mis [dotfiles](https://github.com/champiw/.dotfiles).

## Mejoras futuras

La configuración ya es perfectamente usable, pero todavía hay algunos
aspectos que me gustaría mejorar.

Mi siguiente objetivo es añadir soporte para snippets y completar
automáticamente etiquetas HTML y Svelte. También tengo pensado dividir la
configuración en módulos más pequeños en lugar de mantener todo dentro de un
único `init.lua`.

La idea es mantener una configuración sencilla e incorporar únicamente aquellas
funcionalidades que realmente aporten valor.

