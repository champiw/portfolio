---
title: "My personal portfolio"
description: "Building a simple portfolio and blog page."
date: "2026-07-18"
tags:
    - SvelteKit
    - Tailwind
    - Web Development
repo: "https://github.com/champiw/portfolio"
link: "https://your-domain.dev"
---

## Objectives with this page

I wanted to have a place to document the things I build and learn. Most of my projects end up scattered across random GitHub repositories, notes, and old directories, making it difficult to look back at what I've worked on or share it with other people.

A personal website gives me a central place to showcase what i work on, write about technologies I'm currently interested in, and keep a record of what I'm learning over time.

## Choosing the stack

When deciding what technologies to use, I had a few requirements:

- Already have experience with it
- Simple to work on
- Simple deployment
- Minimal dependencies
- Easy content management

After evaluating a few options, I settled on SvelteKit and Tailwind.

SvelteKit provides most of what i want, plus i've worked with it before. Tailwind is also a framework that i've used before and that i liked to use.

## Content on Markdown files

One of the goals for this website was to avoid introducing a database or CMS to keep it as simple and easy as possible.

Instead, blog posts and project pages are stored as Markdown files with some metadata. During page loading, SvelteKit reads the files and extracts information such as the title, description, date, and tags.

This approach keeps everything inside the repository and allows me to version content alongside the source code.

Adding a new blog post is as simple as creating a new Markdown file.

## Deployment

The site is deployed through Vercel, which integrates nicely with SvelteKit.

Every push to the main branch automatically triggers a new deployment, making updates straightforward. Since the website primarily serves static content, the free tier is more than enough for my needs.

## Future plans

There are still several features I would like to add:

- Better code block highlighting
- Reading time estimates
- Project screenshots
- RSS feed

The goal is to keep the website simple while continuously improving it as I learn new technologies and discover better ways to organize content.

In many ways, this portfolio is one of my projects. It serves as a place to experiment, document progress, and share things I find interesting along the way.