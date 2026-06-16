<script>
	let { data } = $props();
    let post = $derived(data.post);
</script>

<h1>Title: {post.title}</h1>
<p>Description: {post.description}</p>
<p>Date: {post.date}</p>
<p>Tags:</p>
<ul>
	{#each post.tags as tag}
		<li>{tag}</li>
	{/each}
</ul>

<h2>Contents:</h2>
<div>
	{@html post.content}
</div>