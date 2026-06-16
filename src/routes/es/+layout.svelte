<script>
	let { children } = $props();
</script>

<nav>
	<a href="/en">Home</a>
	<a href="/en/blog">Blog</a>
	<a href="/en/projects">Projects</a>
</nav>

<hr />

{@render children()}