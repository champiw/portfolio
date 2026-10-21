<script>
	import { ExternalLink } from '@lucide/svelte';

	let { github = null, demo = null, demoLabel = 'Live demo' } = $props();

	const linkClass =
		'inline-flex items-center gap-1.5 border border-(--border) px-2.5 py-1 text-sm text-(--accent) transition-colors hover:border-(--accent)';
</script>

{#if github || demo}
	<div class="flex flex-wrap items-center gap-2">
		{#if github}
			<a href={github} target="_blank" rel="noopener noreferrer" class={linkClass}>
				GitHub
				<ExternalLink size={14} aria-hidden="true" />
			</a>
		{/if}

		{#if demo}
			<a href={demo} target="_blank" rel="noopener noreferrer" class={linkClass}>
				{demoLabel}
				<ExternalLink size={14} aria-hidden="true" />
			</a>
		{/if}
	</div>
{/if}
