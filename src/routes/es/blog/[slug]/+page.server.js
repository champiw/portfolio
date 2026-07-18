import { getContent } from "$lib/server/content";

export async function load({ params }) {
	const post = getContent("blog", params.slug, "es");

	return {
		post
	};
}