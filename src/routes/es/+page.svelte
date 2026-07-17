<script>
	let { data } = $props();
</script>

<div class="space-y-8">

	<!-- Intro -->
	<div class="space-y-3">
		<p class="text-base leading-relaxed">
			Hola, soy Sergio, un ingeniero DevOps en formación.
		</p>

		<p class="text-base leading-relaxed text-(--muted)">
			¡Bienvenido a mi página!<br>
			Aquí documentaré mis proyectos y publicaré sobre las tecnologías que me interesen en el momento.
		</p>
	</div>

	<!-- Interests -->
	<div class="space-y-3">
		<p class="font-medium text-(--text)">Intereses actuales:</p>

		<ul class="list-disc pl-5 space-y-1 text-(--muted)">
			<li>Docker y Kubernetes</li>
			<li>Nix y NixOS</li>
			<li>Go</li>
			<li>Neovim</li>
		</ul>
	</div>

	<!-- Projects -->
	<div class="space-y-4">

		<h2 class="text-2xl font-bold text-(--accent)">
			Últimos Proyectos
		</h2>

		<ul class="space-y-3">
			{#each data.projects as project}
				<li>
					<a
						class="block border border-(--border) p-4 hover:border-(--accent) transition-colors"
						href={`/es/proyectos/${project.slug}`}
					>
						<h3 class="font-semibold text-(--text)">
							{project.title}
						</h3>

						<p class="text-sm text-(--muted)">
							{project.description}
						</p>
					</a>
				</li>
			{/each}
		</ul>

	</div>

	<!-- Posts -->
	<div class="space-y-4">

		<h2 class="text-2xl font-bold text-(--accent)">
			Últimos Posts
		</h2>

		<ul class="space-y-3">
			{#each data.posts as post}
				<li>
					<a
						class="block border border-(--border) p-4 hover:border-(--accent) transition-colors"
						href={`/es/blog/${post.slug}`}
					>
						<h3 class="font-semibold text-(--text)">
							{post.title}
						</h3>

						<p class="text-sm text-(--muted)">
							{post.description}
						</p>
					</a>
				</li>
			{/each}
		</ul>

	</div>

</div>