<script>
	import '../app.css';

	import { onMount } from 'svelte';

	onMount(async () => {
		// setup client-side provider if it exists
		const { defaultEvmStores } = await import('svelte-ethers-store');
		try {
			defaultEvmStores.setProvider();
		} catch (err) {
			console.error(err);
		}
	});
</script>

<slot />
