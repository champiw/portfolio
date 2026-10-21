import matter from "gray-matter";
import { Marked } from "marked";
import { slugify } from "$lib/slugify";

const modules = import.meta.glob("/src/content/**/*.md", {
	eager: true,
	query: "?raw",
	import: "default"
});

const images = import.meta.glob(
	"/src/content/**/*.{png,jpg,jpeg,webp,avif,gif,svg}",
	{
		eager: true,
		query: "?url",
		import: "default"
	}
);

function escapeHtml(value) {
	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function resolveImage(href, type, slug) {
	const isAbsolute =
		/^[a-z][a-z0-9+.-]*:/i.test(href) ||
		href.startsWith("//") ||
		href.startsWith("/") ||
		href.startsWith("#");

	if (isAbsolute) {
		return href;
	}

	let path;

	try {
		const base = new URL(`/src/content/${type}/${slug}/`, "file://");
		path = decodeURIComponent(new URL(href, base).pathname);
	} catch {
		return href;
	}

	const resolved = images[path];

	if (!resolved) {
		console.warn(`Image not found: ${path}`);
		return href;
	}

	return resolved;
}

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

	const usedIds = new Map();

	const marked = new Marked({
		renderer: {
			heading({ tokens, depth }) {
				const html = this.parser.parseInline(tokens);
				const text = html.replace(/<[^>]*>/g, '');
				const base = slugify(text);
				const count = usedIds.get(base) ?? 0;
				usedIds.set(base, count + 1);
				const id = count > 0 ? `${base}-${count}` : base;

				return `<h${depth} id="${id}">${html}</h${depth}>`;
			},
			image({ href, title, text }) {
				const src = resolveImage(href, type, slug);
				const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";

				return `<img src="${escapeHtml(src)}" alt="${escapeHtml(text)}"${titleAttr} loading="lazy" decoding="async">`;
			}
		}
	});

	const htmlContent = marked.parse(content);

	const headingRegex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
	const headings = [];
	let match;

	while ((match = headingRegex.exec(htmlContent)) !== null) {
		const level = parseInt(match[1]);
		const inner = match[2];
		const text = inner.replace(/<[^>]*>/g, '').trim();
		if (text) {
			const id = inner.match(/id="([^"]+)"/)?.[1] ?? slugify(text);
			headings.push({ level, text, id });
		}
	}

	return {
		slug,
		type,
		lang,
		...data,
		content: htmlContent,
		headings: headings.length >= 3 ? headings : []
	};
}
