---
title: "Mi portfolio personal"
description: "Desarrollando un portfolio y un blog simple."
date: "2026-07-18"
tags:
    - SvelteKit
    - Tailwind
    - Desarrollo Web
repo: "https://github.com/champiw/portfolio"
link: "https://your-domain.dev"
---

## Objetivos de esta página

Quería tener un lugar donde documentar las cosas que desarrollo y voy aprendiendo. La mayoría de mis proyectos acaban repartidos entre distintos repositorios de GitHub, notas y directorios antiguos, lo que hace difícil echar la vista atrás o compartir lo que he hecho con otras personas.

Una página web personal me permite tener un sitio centralizado donde mostrar en qué estoy trabajando, escribir sobre las tecnologías que me interesan en cada momento y llevar un registro de todo lo que voy aprendiendo con el tiempo.

## Elección del stack

A la hora de decidir qué tecnologías utilizar, tenía varios requisitos:

- Tener experiencia previa con ellas.
- Que fueran sencillas de usar.
- Que el despliegue fuera simple.
- Mantener el número de dependencias al mínimo.
- Que la gestión del contenido fuera sencilla.

Después de valorar varias opciones, terminé decantándome por SvelteKit y Tailwind.

SvelteKit ofrece prácticamente todo lo que buscaba además de que ya había trabajado con él anteriormente. Por otro lado, Tailwind también es un framework con el que ya tenía experiencia y que siempre me ha resultado cómodo de utilizar.

## Contenido en archivos Markdown

Uno de los objetivos de esta web era evitar introducir una base de datos o un CMS para mantener el proyecto lo más simple posible.

En su lugar, las entradas del blog y las páginas de proyectos se almacenan como archivos Markdown con algunos metadatos. Durante la carga de cada página, SvelteKit lee esos archivos y extrae información como el título, la descripción, la fecha y las etiquetas.

Este enfoque mantiene todo el contenido dentro del propio repositorio y permite versionarlo junto con el código fuente.

Añadir una nueva entrada al blog es tan sencillo como crear un nuevo archivo Markdown.

## Despliegue

La página está desplegada en Vercel, que se integra perfectamente con SvelteKit.

Cada vez que hago un *push* a la rama principal se genera automáticamente un nuevo despliegue, por lo que publicar cambios resulta muy sencillo. Como la web sirve principalmente contenido estático, el plan gratuito es más que suficiente para mis necesidades.

## Planes de futuro

Todavía hay varias funcionalidades que me gustaría añadir:

- Mejor resaltado de sintaxis para bloques de código
- Estimación del tiempo de lectura
- Capturas de pantalla de los proyectos
- Feed RSS

El objetivo es mantener la página sencilla mientras la voy mejorando poco a poco a medida que aprendo nuevas tecnologías y descubro mejores formas de organizar el contenido.

En cierto modo, este portfolio es también uno de mis proyectos. Me sirve como un lugar donde experimentar, documentar mi progreso y compartir las cosas que me resultan interesantes.