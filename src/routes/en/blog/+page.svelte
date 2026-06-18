<script>
	let { data } = $props();
</script>

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