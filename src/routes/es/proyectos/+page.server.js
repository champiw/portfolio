import { getAllContent } from "$lib/server/content";

export async function load() {
    const projects = getAllContent("projects", "es");
    return {
        projects: projects.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        )
    }
};