import matter from "gray-matter";
import { marked } from "marked";

const modules = import.meta.glob("/src/content/**/*.md", {
	eager: true,
	query: "?raw",
	import: "default"
});

function getModule(type, slug, lang) {
	const key = `/src/content/${type}/${slug}/${lang}.md`;
	const file = modules[key];

	if (!file) {
		throw new Error(`Content not found: ${key}`);
	}

	return file;
}

export function getAllContent(type, lang = "en") {
	const prefix = `/src/content/${type}/`;

	return Object.entries(modules)
		.filter(([file]) => file.startsWith(prefix) && file.endsWith(`/${lang}.md`))
		.map(([file, content]) => {
			const slug = file.split("/")[4];
			const { data } = matter(content);

			return {
				slug,
				type,
				title: data.title,
				description: data.description,
				date: data.date,
				tags: data.tags ?? [],
				github: data.github ?? null,
				demo: data.demo ?? null
			};
		});
}

export function getContent(type, slug, lang = "en") {
	const file = getModule(type, slug, lang);

	const { data, content } = matter(file);

	return {
		slug,
		type,
		lang,
		...data,
		content: marked.parse(content)
	};
}