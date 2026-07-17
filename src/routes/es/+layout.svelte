<script>
	import pfp from '$lib/assets/chen_recorte.jpg';
	import { Moon, Sun } from '@lucide/svelte';

	import { onMount } from 'svelte';
	import { page } from '$app/state';

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

	const navClass = (active) =>
		`border px-2.5 py-1 transition-colors hover:text-(--accent)
		${active ? 'text-(--accent)' : ''}`;

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col items-center p-4 sm:p-6 bg-(--bg) text-(--text)">

	<div class="w-full max-w-4xl border border-(--border) p-5 sm:p-10 my-4 sm:my-10">

		<header
			class="flex flex-col gap-4 border-b border-(--border) pb-6 sm:flex-row sm:items-center sm:justify-between"
		>

			<a href="/es" class="flex items-center gap-3 sm:gap-4">
				<img
					src={pfp}
					alt=""
					aria-hidden="true"
					class="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover"
				/>

				<span class="text-xl sm:text-2xl font-bold">
					Champi
				</span>
			</a>

			<div
				class="flex flex-wrap items-center gap-3 sm:gap-4"
			>

				<nav class="flex flex-wrap gap-2 text-sm">
					<button
						class="border px-2.5 py-1 transition-colors hover:text-(--accent)"
						aria-label="Toggle theme"
						onclick={toggleTheme}
					>
						{#if isLight}
							<Sun size={16} />
						{:else}
							<Moon size={16} />
						{/if}
					</button>
					<a
						class="border px-2.5 py-1 {navClass(page.url.pathname === ('/es'))}"
						href="/es"
					>
						Inicio
					</a>

					<a
						class="border px-2.5 py-1 {navClass(page.url.pathname.startsWith('/es/blog'))}"
						href="/es/blog"
					>
						Blog
					</a>

					<a
						class="border px-2.5 py-1 {navClass(page.url.pathname.startsWith('/es/proyectos'))}"
						href="/es/proyectos"
					>
						Proyectos
					</a>

					<a
						class="border px-2.5 py-1 {navClass(page.url.pathname.startsWith('/es/contacto'))}"
						href="/es/contacto"
					>
						Contacto
					</a>
				</nav>
			</div>

		</header>

		<main class="pt-8">
			{@render children()}
		</main>

	</div>

</div>