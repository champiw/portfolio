import { getAllContent } from "$lib/server/content";

export async function load() {
    const blogPosts = getAllContent("blog", "en");
    return {
        posts: blogPosts.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        )
    }
};