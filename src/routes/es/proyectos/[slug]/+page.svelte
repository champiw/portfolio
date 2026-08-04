<script>
	import { page } from '$app/state';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import TOC from '$lib/components/TOC.svelte';

	let { data } = $props();
	let project = $derived(data.project);

	const projectUrl = $derived(`${page.url.origin}/es/proyectos/${project.slug}`);
</script>

<div class="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
	<div class="order-2 lg:order-2 space-y-10">

		<!-- Header -->
		<header class="space-y-4">
			<h1 class="text-3xl font-bold leading-tight">
				{project.title}
			</h1>

			<p class="text-(--muted)">
				{project.description}
			</p>

			<div class="flex flex-wrap items-center gap-4 text-sm text-(--muted)">
				<p>
					{project.date}
				</p>
				{#if project.github}
					<a
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-(--accent) transition-colors"
					>
						GitHub
					</a>
				{/if}
			</div>

			<!-- Share Buttons -->
			<ShareButtons title={project.title} url={projectUrl} />

			<!-- Tags -->
			{#if project.tags?.length}
				<div class="flex flex-wrap gap-2">
					{#each project.tags as tag}
						<span
							class="border border-(--border) px-2 py-0.5 text-xs text-(--accent)"
						>
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</header>

		<section class="prose prose-invert max-w-none
			prose-headings:text-(--text)
			prose-p:text-(--text)
			prose-strong:text-(--text)
			prose-a:text-(--accent)
		">
			{@html project.content}
		</section>

	</div>

	<div class="order-1 lg:order-1">
		<TOC headings={project.headings} />
	</div>
</div>
