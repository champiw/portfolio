<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>

	<script>
		(function () {
			const theme = localStorage.getItem('theme');

			const isLight = theme === 'light';

			if (isLight) {
				document.documentElement.classList.add('light');
			} else {
				document.documentElement.classList.remove('light');
			}
		})();
	</script>

	<link rel="icon" type="image/png" href="/favicon.png">
</svelte:head>
{@render children()}
