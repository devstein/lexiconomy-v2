<script>
	import '../app.css';

	import { onMount } from 'svelte';

	import Header from '$lib/components/Header.svelte';

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

<Header />

<div class="px-40 py-8">
	<slot />
</div>
