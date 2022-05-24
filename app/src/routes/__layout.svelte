<script>
	import '../app.css';

	import { onMount } from 'svelte';

	import Header from '$lib/components/Header.svelte';
	import ConnectWallet from '$lib/components/ConnectWallet.svelte';

	onMount(async () => {
		// setup client-side provider if it exists
		const { defaultEvmStores } = await import('svelte-ethers-store');
		try {
			defaultEvmStores.setProvider();
			console.log('connected to default provider');

			try {
				window.heap.track('Connect', { Method: 'Mount' });
			} catch (err) {
				console.log('failed to track connect event', err);
			}
		} catch (err) {
			console.error('failed to get window provider', err);
		}
	});
</script>

<Header />

<div class="px-4 md:px-16 lg:px-32 py-4 md:py-8">
	<slot />
</div>

<ConnectWallet />
