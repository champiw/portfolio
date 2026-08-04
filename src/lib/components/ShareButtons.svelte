<script>
	import { Copy } from '@lucide/svelte';

	let { title = '', url = '' } = $props();

	let showCopyToast = $state(false);
	let toastTimer = $state(0);

	function openShare(linkUrl) {
		window.open(linkUrl, '_blank', 'width=600,height=400');
	}

	function shareToX() {
		const text = encodeURIComponent(`${title} ${url}`);
		openShare(`https://twitter.com/intent/tweet?text=${text}`);
	}

	function shareToLinkedIn() {
		const text = encodeURIComponent(`${title} ${url}`);
		openShare(`https://www.linkedin.com/feed/?shareActive=true&text=${text}`);
	}

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(url);
			showToast();
		} catch {
			const textarea = document.createElement('textarea');
			textarea.value = url;
			document.body.appendChild(textarea);
			textarea.select();
			try {
				document.execCommand('copy');
				showToast();
			} finally {
				document.body.removeChild(textarea);
			}
		}
	}

	function showToast() {
		showCopyToast = true;
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => {
			showCopyToast = false;
		}, 2000);
	}
</script>

<div class="flex gap-2 items-center">
	<button
		class="p-2 rounded-lg bg-(--border)/30 hover:bg-(--border)/50 transition-colors cursor-pointer"
		aria-label="Share on X"
		onclick={shareToX}
	>
		<svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4" aria-hidden="true">
			<path
				d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
			/>
		</svg>
	</button>
	<button
		class="p-2 rounded-lg bg-(--border)/30 hover:bg-(--border)/50 transition-colors cursor-pointer"
		aria-label="Share on LinkedIn"
		onclick={shareToLinkedIn}
	>
		<svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4" aria-hidden="true">
			<path
				d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
			/>
		</svg>
	</button>
	<button
		class="p-2 rounded-lg bg-(--border)/30 hover:bg-(--border)/50 transition-colors cursor-pointer"
		aria-label="Copy link"
		onclick={copyLink}
	>
		<Copy size={16} />
	</button>

	{#if showCopyToast}
		<span class="text-sm text-green-400">Copied!</span>
	{/if}
</div>
