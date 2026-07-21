---
title: "My first month on NixOS"
description: "How i went from using Windows straight to using NixOS on all my computers."
date: "2026-07-4"
tags:
    - NixOS
    - Homelab
---

## What is NixOS

NixOS is a Linux distribution built around the Nix package manager. Instead of configuring your system by manually editing files or installing packages one by one, you describe your entire system in a configuration file. NixOS then builds your system from that configuration, making it easy to reproduce and update. Each time you build your system it creates a new system generation, and you can roll back to a previous one if something goes wrong.

## Previous Linux distributions

Personally i've always had a surface level understanding of Linux. I've never learned about what parts compose a usable system or why there's different Linux distrubutions until recently, since i've used Windows up until this point. I did use Linux ocasionally but not on my main system.

I've used Debian during my classes, where i learned how to use the terminal and some basics of linux, users and permissions, file structure etc. 

Next i dualbooted Arch, but using soem install script that i found on GitHub, which meant that i didnt know what was installed or what was going on most of the time.

After that i decided to delete Arch and have a simple Debian, which i was more confident to use when i needed to.

This leads me to the time where i learnt about NixOS and all of its features, which i thought were pretty interesting so i decided to give it an honest try.

## First install

A lot of people install NixOS in a virtual machine to build their config before installing it. In my case i used an old laptop i had laying around which i wanted to use for a home server. Before that though, i made a basic desktop configuration to have as a base for when i install it on my main machine.

I tried to keep it simple and not use any extra libraries i didnt understand, i just used flakes so i can have both the server and desktop and pick between them.

### Screenshare on wayland

A pretty dumb problem i had during this first desktop configuration was getting screensharing portals to work. I decided to use Niri as my window manager, which is based on wayland. I tried to use different LLMs to guide me on the general installation, so i didnt open the install guide for Niri, which it was the biggest mistake, and had to learn it the hard way. 

My gnome portal didnt start, saying it had a dependency error and i tried everything i found to fix it, including using LLMs again. I spent a good 3-4 days on this issue, and looking back it was as simple to fix as following the Niri documentation install guide and reading it carefully.

The problem was how i was starting Niri itself. I used a really minimal login screen which used the TTY, so going by the Niri documentation i had to run ```niri-session```. Once i made this change, everything worked, and i removed all the weird workarounds i tried to do from my config.

So two lessons learned in the first week, read the documentation, and dont blindly trust LLMs, which both should've been obvious in the first place.

### Start of my homelab

After the previous incident i applied what i had learned and i had a way easier time. I managed to have a usable desktop config, so i moved on with the server one.

I decided to leave my laptop as a homelab where i planned to self host services i used regularly. Here i learned how easy is to add services to NixOS, and how easy is to get a working config that feels stable and reproducible.

I exposed an external disk through Samba to act as a NAS so i can backup documents from my Windows desktop before i make the switch. I've also added Jellyfin to host my music library and stream it from my desktop and phone. And finally, i've added Syncthing to sync my Obsidian vault across my desktop and phone.

Some things i want to improve in the future is to get an actual multibay NAS, since i'm only using one drive right now, if it dies, i lose everything. And research how can i safely expose certain services like Syncthing and Jellyfin to the outside of my home network to be able to use them everywhere.

## Jumping in at the deep end

Here's when i actually installed NixOS in my main pc, i wiped every one of my drives and installed the new OS on my first nvme drive.

Having my basic config made this part easier. I simply started adding new programs to the system as i needed them, obs, obsidian etc. All while keeping everything organised in the config.

### Flakes and structuring the configuration

Since i now have both my server and my main desktop in the same configuration, i took 1-2 days to think different approaches to how i want to structure everything, i've also looked at other NixOS users configurations to see how other people did this. I've noticed that a lot of them used Home Manager or similar tools to also have each app configurations, which i noted to implement.

In the end i decided to have something like this:

- hosts
	- host-name
		- default.nix
		- hardware.nix
- modules
	- base
		- Base configs for all hosts
	- desktop
		- Niri and Noctalia config
	- hardware
		- Nvidia and audio drivers
	- network
		- Add newtork storage and other configs to the system
	- programs
		- All my installed programs (steam, obs, vscode, nvim)
	- services
		- All my hosted services (jellyfin, syncthing)
- flake.nix
- flake.lock

Each machine would have a folder in "hosts" where i pick and import files from the "modules" folder to add features i'd like in each machine.

### Objective for Home Manager

Home Manager is a system for managing your user environment, for example installing user programs or managing dotfiles.

I see Home Manager as a neccessary part of what i want to achieve with my config. Once i import an application module, i want it to install the application in the system, and to configure it how i want it, all in the same file.

So my solution to this was to mix NixOS system configurations and Home Manager options in the same files. Maybe its not the best practice, but it works for me and i think its organised enough to not be a problem. Maybe i will change my mind about this once i'm more experienced with this distro.

## Current system

Right now i have a working setup where i'm comfortable, and i can do everything i need really comfortably.

[Here's the link to the repo!](https://github.com/champiw/.dotfiles)

Some things i still need to finish doing or add in the future:

- Config apps using home manager declaratively
- Create a Neovim configuration
- Apply a color theme system wide
- Add a dualboot with windows since some apps are not compatible with linux
