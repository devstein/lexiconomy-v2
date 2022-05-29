<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	import { slide } from 'svelte/transition';

	const LOADING_PAGE_DELAY = 500;
	let loading = true;
	let loadingDelayId: ReturnType<typeof setTimeout> | undefined = undefined;

	beforeNavigate(() => {
		loadingDelayId = setTimeout(() => {
			loading = true;
		}, LOADING_PAGE_DELAY);
	});

	afterNavigate(() => {
		loadingDelayId && clearTimeout(loadingDelayId);
		loading = false;
		loadingDelayId = undefined;
	});

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
	{#if loading}
		<div class="h-screen flex flex-col justify-start items-center py-8 md:py-20">
			<img alt="loading lemmas" in:slide={{ duration: 1500 }} src="/images/lexiconomy.gif" />
		</div>
	{:else}
		<slot />
	{/if}
</div>

<ConnectWallet />
