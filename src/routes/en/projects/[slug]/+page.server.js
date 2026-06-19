import { getContent } from "$lib/server/content";

export async function load({ params }) {
	const project = getContent("projects", params.slug, "en");

	return {
		project
	};
}