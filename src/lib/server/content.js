import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const BASE_PATH = path.join(process.cwd(), "content");

function getContentSlugs(type) {
    return fs.readdirSync(path.join(BASE_PATH, type));
}

function loadContent(type, slug, lang) {
    const filePath = path.join(BASE_PATH, type, slug, `${lang}.md`);

    const file = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(file);

    return {
        slug,
        type,
        lang,
        ...data,
        content: marked(content)
    }
}

export function getAllContent(type, lang = "en") {
  const slugs = getContentSlugs(type);

  const items = slugs.map((slug) => {
    const item = loadContent(type, slug, lang);

    return {
      slug: item.slug,
      type: item.type,
      title: item.title,
      description: item.description,
      date: item.date,
      tags: item.tags || [],
      github: item.github || null,
      demo: item.demo || null
    };
  });

  return items;
}

export function getContent(type, slug, lang = "en") {
    return loadContent(type, slug, lang)
}