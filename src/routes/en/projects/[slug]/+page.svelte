<script>
	let { data } = $props();
    let project = $derived(data.project);
</script>

<h1>Title: {project.title}</h1>
<p>Description: {project.description}</p>
<p>Date: {project.date}</p>
<p>Tags:</p>
<ul>
	{#each project.tags as tag}
		<li>{tag}</li>
	{/each}
</ul>

<h2>Contents:</h2>
<div>
	{@html project.content}
</div>