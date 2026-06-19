<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
    
	onMount(() => {
		const lang = navigator.language.startsWith('es') ? 'es' : 'en';
		goto(`/${lang}`);
	});
</script>

<div class="min-h-screen bg-(--bg) text-(--text)">
<p class="text-center">Redirecting...</p>
</div>