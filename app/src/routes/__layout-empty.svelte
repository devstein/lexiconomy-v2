<script>
	import '../app.css';

	import { onMount } from 'svelte';

	onMount(async () => {
		// setup client-side provider if it exists
		const { defaultEvmStores } = await import('svelte-ethers-store');
		try {
			defaultEvmStores.setProvider();
			console.log('connected to default provider');
		} catch (err) {
			console.error('failed to get window provider', err);
		}
	});
</script>

<slot />
