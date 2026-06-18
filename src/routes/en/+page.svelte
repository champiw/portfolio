<script>
	let { data } = $props();
</script>

<h2>Latest Posts: </h2>

<ul>
	{#each data.posts as post}
		<li>
			<a href={`/en/blog/${post.slug}`}>
				<h3>{post.title}</h3>
				<p>{post.description}</p>
			</a>
		</li>
	{/each}
</ul>

<h2>Latest Projects: </h2>

<ul>
	{#each data.projects as project}
		<li>
			<a href={`/en/projects/${project.slug}`}>
				<h3>{project.title}</h3>
				<p>{project.description}</p>
			</a>
		</li>
	{/each}
</ul>