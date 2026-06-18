<script>
	import pfp from '$lib/assets/chen_recorte.jpg';

	import { onMount } from 'svelte';

	let isLight = $state(false);

	onMount(() => {
		const saved = localStorage.getItem('theme');

		if (saved === 'light') {
			isLight = true;
			document.documentElement.classList.add('light');
		}
	});

	function toggleTheme() {
		isLight = !isLight;

		document.documentElement.classList.toggle('light', isLight);

		localStorage.setItem('theme', isLight ? 'light' : 'dark');
	}

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col items-center p-6 bg-(--bg) text-(--text)">

	<div class="w-full max-w-4xl border border-(--border) p-10 my-6 sm:my-10">

		<header class="flex items-center justify-between border-b border-(--border) pb-6">

			<!-- Left: identity -->
			<div class="flex items-center gap-4">
				<img
					src={pfp}
					alt=""
					aria-hidden="true"
					class="h-16 w-16 rounded-full object-cover"
				/>

				<span class="text-2xl font-bold">
					Sergio Bértolo
				</span>
			</div>

			<!-- Right: controls -->
			<div class="flex items-center gap-4">

				<button
					class="text-sm text-(--muted) hover:text-(--text) transition"
					aria-label="Toggle theme"
					onclick={toggleTheme}
				>
					{isLight ? '🌞' : '🌙'}
				</button>

				<nav class="flex gap-3 text-sm">
					<a class="hover:text-(--text) text-sm border px-2.5 py-1" href="/en">home</a>
					<a class="hover:text-(--text) text-sm border px-2.5 py-1" href="/en/blog">blog</a>
					<a class="hover:text-(--text) text-sm border px-2.5 py-1" href="/en/projects">projects</a>
				</nav>

			</div>

		</header>

		<main class="pt-8">
			{@render children()}
		</main>

	</div>

</div>