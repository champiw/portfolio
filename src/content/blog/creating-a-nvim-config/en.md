---
title: "Building My Neovim Setup with vim.pack"
description: "Making a neovim config starting from a blank configuration, and using native package management."
date: "2026-08-7"
tags:
    - NixOS
    - Homelab
---

## Why Neovim

For the past few years I've mostly used Visual Studio Code. It works well and i
dont have reasons to switch, but I've always been curious about Neovim and
wanted to understand why so many developers invest time into learning it and
configuring it.

I really like the idea of a keyboard centric text editor. I've been using a
vscode extension to emulate vim motions, and i also use it on Obsidian. And
after using them for some time, i've found that using them is really
comfortable, so i decided to try the actual terminal editor.

Rather than installing a pre-built distribution like LazyVim, NvChad or
AstroNvim, I wanted to make my own that fits my needs. The goal was building a
config over time that i know how it works, and i can set it the way i like it
from the start.

Since I'm using NixOS, I also wanted my configuration to be reproducible and
version-controlled inside my dotfiles.

## Objective for the config

My objective is to build a lightweight Neovim configuration using the new
native features introduced in Neovim 0.12.

Instead of relying on an external plugin manager, I'm using `vim.pack` to
manage plugins. This keeps the configuration simple while still making it easy
to install, update and remove packages.

So far the configuration includes:

* Basic editor settings and keymaps.
* LSP(Language Server Protocol) support using `nvim-lspconfig`.
* Language servers for Nix, Lua, HTML, CSS, Tailwind CSS, Svelte and Docker.
* Treesitter for syntax highlighting.
* `blink.cmp` for LSP-powered autocompletion.
* A custom colorscheme.
* Custom `:PackUpdate`, `:PackDelete` and `:PackClean` commands for easier
  plugin management.

One of the first issues was Treesitter being enabled for every file. Neovim
attempted to start a parser for `netrw`, which doesn't exist, causing errors
every time I navigated directories. Restricting the autocommand to only the
languages I actually installed solved the problem. After this i had some more
issues with dependencies of some plugins, which were easy to resolve.

At this point the configuration provides everything I consider essential:

* Diagnostics from the language servers.
* Formatting through LSP.
* Semantic syntax highlighting.
* Autocompletion.

The entire configuration still lives in a single `init.lua` file. Once I'm
satisfied with the functionality, and it continues growing in size, I'll split
it into smaller modules to make it easier to maintain.

You can check the config in my
[dotfiles](https://github.com/champiw/.dotfiles).

## Future improvements

The configuration is already usable, but there are still a few things I'd like
to improve.

My next focus is adding snippet support and automatic HTML/Svelte tag
completion. I also plan to split the configuration into smaller modules instead
of keeping everything in a single `init.lua`.

The goal is to keep the setup simple and only add features that matter.
