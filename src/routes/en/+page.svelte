<script>
	let { data } = $props();
</script>

<div class="space-y-8">

	<!-- Intro -->
	<div class="space-y-3">
		<p class="text-base leading-relaxed">
			Hello, I'm Sergio, an aspiring DevOps engineer.
		</p>

		<p class="text-base leading-relaxed text-(--muted)">
			Welcome to my page!<br>
			Here I document my projects and post about the technologies i'm interested in.
		</p>
	</div>

	<!-- Interests -->
	<div class="space-y-3">
		<p class="font-medium text-(--text)">Current interests:</p>

		<ul class="list-disc pl-5 space-y-1 text-(--muted)">
			<li>Docker & Kubernetes</li>
			<li>Nix & NixOS</li>
			<li>Go</li>
			<li>Neovim</li>
		</ul>
	</div>

	<!-- Projects -->
	<div class="space-y-4">

		<h2 class="text-2xl font-bold text-(--accent)">
			Latest Projects
		</h2>

		<ul class="space-y-3">
			{#each data.projects as project}
				<li>
					<a
						class="block border border-(--border) p-4 hover:border-(--accent) transition-colors"
						href={`/en/projects/${project.slug}`}
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
			Latest Posts
		</h2>

		<ul class="space-y-3">
			{#each data.posts as post}
				<li>
					<a
						class="block border border-(--border) p-4 hover:border-(--accent) transition-colors"
						href={`/en/blog/${post.slug}`}
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