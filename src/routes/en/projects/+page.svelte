<script>
	let { data } = $props();
</script>

<ul>
    {#each data.projects as project}
        <li>
            <a href={`/en/blog/${project.slug}`}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
            </a>
        </li>
    {/each}
</ul>