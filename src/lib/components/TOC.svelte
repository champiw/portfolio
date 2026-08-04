<script>
	import { ChevronDown, ChevronUp } from '@lucide/svelte';

	let { headings = [] } = $props();

	let open = $state(false);

	function scrollToHeading(id) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ block: 'start' });
			open = false;
		}
	}
</script>

{#if headings.length >= 3}
	<details class="mb-4 sm:hidden" bind:open={open}>
		<summary
			class="list-none cursor-pointer select-none flex items-center justify-between gap-2 border border-(--border) px-3 py-2 text-sm font-medium text-(--text) hover:text-(--accent) transition-colors"
		>
			<span>Contents</span>
			{#if open}
				<ChevronUp size={16} />
			{:else}
				<ChevronDown size={16} />
			{/if}
		</summary>

		<nav class="mt-2 border border-(--border) p-3">
			<ul class="space-y-1.5">
				{#each headings as h}
					<li class:pl={h.level === 3 ? 6 : 0}>
						<a
							href={'#' + h.id}
							class="text-sm text-(--muted) hover:text-(--accent) transition-colors"
							onclick={(e) => {
								e.preventDefault();
								scrollToHeading(h.id);
							}}
						>
							{h.text}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</details>

	<nav class="sticky top-6 hidden sm:block">
		<h4 class="mb-3 text-sm font-semibold text-(--text)">
			Contents
		</h4>
		<ul class="space-y-2">
			{#each headings as h}
				<li class:pl={h.level === 3 ? 5 : 0}>
					<a
						href={'#' + h.id}
						class="text-sm text-(--muted) hover:text-(--accent) transition-colors"
						onclick={(e) => {
							e.preventDefault();
							scrollToHeading(h.id);
						}}
					>
						{h.text}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
