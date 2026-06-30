<script>
	let { data } = $props();

	let search = $state('');
	let selectedTags = $state([]);

	// List of all tags
	const tags = [
		...new Set(
			data.projects.flatMap((project) => project.tags ?? [])
		)
	].sort();

	function toggleTag(tag) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((t) => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}

	const filteredProjects = $derived(
		data.projects.filter((project) => {
			const matchesSearch =
				project.title.toLowerCase().includes(search.toLowerCase()) ||
				project.description.toLowerCase().includes(search.toLowerCase());

			const matchesTags =
				selectedTags.length === 0 ||
				selectedTags.every((tag) => (project.tags ?? []).includes(tag));

			return matchesSearch && matchesTags;
		})
	);
</script>

<div class="space-y-8">

	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">
			Projects
		</h1>

		<p class="mt-2 text-(--muted)">
			A collection of things I’ve built, experiments and tools.
		</p>
	</div>

	<!-- Search + Tags -->
	<div class="space-y-4">

		<input
			bind:value={search}
			type="search"
			placeholder="Search projects..."
			class="w-full border border-(--border) bg-transparent px-3 py-2 outline-none focus:border-(--accent)"
		/>

		<div class="flex flex-wrap gap-2">

			<button
				type="button"
				onclick={() => (selectedTags = [])}
				class={`border px-3 py-1 text-sm transition-colors ${
					selectedTags.length === 0
						? 'border-(--accent) text-(--accent)'
						: 'border-(--border) hover:border-(--accent)'
				}`}
			>
				All
			</button>

			{#each tags as tag}
				<button
					type="button"
					onclick={() => toggleTag(tag)}
					class={`border px-3 py-1 text-sm transition-colors ${
						selectedTags.includes(tag)
							? 'border-(--accent) text-(--accent)'
							: 'border-(--border) hover:border-(--accent)'
					}`}
				>
					{tag}
				</button>
			{/each}

		</div>

	</div>

	<!-- Projects list -->
	<ul class="space-y-3">

		{#each filteredProjects as project}

			<li>
				<a
					href={`/en/projects/${project.slug}`}
					class="block border border-(--border) p-4 transition-colors hover:border-(--accent)"
				>

					<div class="flex items-start justify-between gap-4">

						<div>
							<h2 class="font-semibold">
								{project.title}
							</h2>

							<p class="mt-1 text-sm text-(--muted)">
								{project.description}
							</p>
						</div>

						{#if project.date}
							<p class="shrink-0 text-sm text-(--muted)">
								{project.date}
							</p>
						{/if}

					</div>

					{#if project.tags?.length}
						<div class="mt-3 flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span
									class="border border-(--border) px-2 py-0.5 text-xs text-(--accent)"
								>
									{tag}
								</span>
							{/each}
						</div>
					{/if}

				</a>
			</li>

		{/each}

		{#if filteredProjects.length === 0}
			<li class="border border-dashed border-(--border) p-6 text-center text-(--muted)">
				No projects found.
			</li>
		{/if}

	</ul>

</div>