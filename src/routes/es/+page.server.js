import { getAllContent } from "$lib/server/content";

export async function load() {
    const blogPosts = getAllContent("blog", "en");
    const sortedBlog = blogPosts.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const projects = getAllContent("projects", "en");
    const sortedProjects = projects.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return {
        posts: sortedBlog.slice(0,5),
        projects: sortedProjects.slice(0,3)
    };
};