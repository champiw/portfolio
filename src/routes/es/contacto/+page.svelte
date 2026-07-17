<script>
	const links = [
		{
			label: 'Email',
			value: 'sergio@example.com',
			href: 'mailto:sergio@example.com'
		},
		{
			label: 'GitHub',
			value: 'github.com/yourusername',
			href: 'https://github.com/yourusername'
		},
		{
			label: 'LinkedIn',
			value: 'linkedin.com/in/yourusername',
			href: 'https://www.linkedin.com/in/yourusername'
		}
	];
</script>

<div class="space-y-8">

	<div>
		<h1 class="text-3xl font-bold">
			Contacto
		</h1>

		<p class="mt-2 text-(--muted)">
			Puedes contactarme a través de correo electrónico u otras plataformas.
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