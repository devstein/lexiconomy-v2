<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import type { BigNumber } from 'ethers';
	import { connected, signerAddress, provider } from 'svelte-ethers-store';

	import Header from '$lib/components/Header.svelte';
	import { getContractWithProvider } from '$lib/web3/contract';

	export let lemma: string;
	export let owner: string;
	export let approved: string;
	export let tokenId: BigNumber;

	const ZERO_ADDR = '0x0000000000000000000000000000000000000000';

	const exists = Boolean(owner) && owner !== ZERO_ADDR;
	let canOperate = false;

	console.log(owner, approved, tokenId, lemma);

	onMount(async () => {
		if (!($connected && exists)) return;

		console.log($connected, $signerAddress);

		canOperate =
			$signerAddress.toLowerCase() === owner.toLowerCase() ||
			$signerAddress.toLowerCase() === approved.toLowerCase();
	});

	const mint = async () => {
		const contract = await getContractWithProvider($provider);
		const fee = await contract.mintFee();

		await contract.mint(lemma, {
			value: fee
		});
	};

	const connect = async () => {};
</script>

<Header />
<div>{lemma}</div>
<button class="p-4 bg-green-200 rounded" on:click={connect}>Connect</button>
{#if exists}
	<div>
		<a
			rel="external"
			target="_blank"
			class="text-blue-400"
			href="https://ropsten.etherscan.io/token/0xa4097dadaa50dbe0fef2dd2d5c6699a930f287a6?a={tokenId}#inventory"
		>
			View Token Info
		</a>
	</div>
	<div>this lemma is defined!</div>
	<div>definition goes here!</div>
	<div>example goes here!</div>
{:else}
	<div>this lemma is undefined!</div>
	<button class="p-4 bg-gray-200 rounded" on:click={mint}>Mint</button>
{/if}
{#if canOperate}
	<button class="p-4 bg-gray-200 rounded" on:click={() => {}}>Define</button>
	<button class="p-4 bg-green-200 rounded" on:click={() => {}}>Example</button>
{/if}
