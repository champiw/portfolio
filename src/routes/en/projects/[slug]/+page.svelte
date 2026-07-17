<script>
	let { data } = $props();
	let project = $derived(data.project);
</script>

<article class="space-y-10">

	<!-- Header -->
	<header class="space-y-4">

		<h1 class="text-3xl font-bold leading-tight">
			{project.title}
		</h1>

		<p class="text-(--muted)">
			{project.description}
		</p>

		<div class="flex flex-wrap items-center gap-4 text-sm text-(--muted)">

			{#if project.date}
				<p>
					{project.date}
				</p>
			{/if}

			{#if project.link}
				<a
					href={project.link}
					target="_blank"
					rel="noreferrer"
					class="text-(--accent) hover:underline"
				>
					Live Demo
				</a>
			{/if}

			{#if project.repo}
				<a
					href={project.repo}
					target="_blank"
					rel="noreferrer"
					class="text-(--accent) hover:underline"
				>
					GitHub
				</a>
			{/if}

		</div>

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

	<!-- Content -->
	<section class="prose prose-invert max-w-none
		prose-headings:text-(--text)
		prose-p:text-(--text)
		prose-strong:text-(--text)
		prose-a:text-(--accent)
		prose-li:text-(--text)
		prose-blockquote:text-(--muted)
	">

		{@html project.content}

	</section>

</article>