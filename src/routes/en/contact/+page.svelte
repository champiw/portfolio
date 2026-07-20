<script>
	const links = [
		{
			label: 'Email',
			value: 'sergio.bertolo.castro@gmail.com',
			href: 'mailto:sergio.bertolo.castro@gmail.com'
		},
		{
			label: 'GitHub',
			value: 'github.com/champiw',
			href: 'https://github.com/champiw'
		},
		{
			label: 'LinkedIn',
			value: 'linkedin.com/in/sergio-bértolo-castro',
			href: 'https://www.linkedin.com/in/sergio-bértolo-castro'
		}
	];
</script>

<div class="space-y-8">

	<div>
		<h1 class="text-3xl font-bold">
			Contact
		</h1>

		<p class="mt-2 text-(--muted)">
			You can reach me through email or social platforms.
		</p>
	</div>

	<div class="grid gap-4">

		{#each links as link}
			<a
				href={link.href}
				target="_blank"
				rel="noreferrer"
				class="block border border-(--border) p-4 transition-colors hover:border-(--accent)"
			>

				<div class="flex items-center justify-between">

					<div>
						<h2 class="font-semibold text-(--text)">
							{link.label}
						</h2>

						<p class="text-sm text-(--muted)">
							{link.value}
						</p>
					</div>

					<span class="text-(--accent)">
						↗
					</span>

				</div>

			</a>
		{/each}

	</div>

</div>