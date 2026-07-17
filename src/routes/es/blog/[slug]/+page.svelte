<script>
	let { data } = $props();
	let post = $derived(data.post);
</script>

<article class="space-y-10">

	<!-- Header -->
	<header class="space-y-4">

		<h1 class="text-3xl font-bold leading-tight">
			{post.title}
		</h1>

		<p class="text-(--muted)">
			{post.description}
		</p>

		<div class="flex flex-wrap items-center gap-4 text-sm text-(--muted)">

			<p>
				{post.date}
			</p>

		</div>

		<!-- Tags -->
		{#if post.tags?.length}
			<div class="flex flex-wrap gap-2">

				{#each post.tags as tag}
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

		{@html post.content}

	</section>

</article>