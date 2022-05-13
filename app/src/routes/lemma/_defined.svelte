<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { browser } from '$app/env';

	import { connected, signerAddress, provider } from 'svelte-ethers-store';

	import { getContractWithProvider } from '$lib/web3/contract';
	import chainInfo from '$lib/web3/chains';

	import EditableTextArea from '$lib/components/EditableTextArea.svelte';

	// pass lemma as prop
	export let tokenId: string;
	export let number: string;
	export let definition: string;
	export let example: string;
	export let owner: string;
	export let approved: string;

	export let chainId: number;

	let canOperate = false;

	// GET CHAIN INFO FROM SERVER!
	const { lexiconomyAddress, blockExplorerURI, openSeaURI, raribleURI } = chainInfo[chainId];

	if (browser) {
	}

	// TODO: RE-Evaluate!
	console.log($provider, $connected, $signerAddress, owner, approved);
	$: canOperate =
		$connected &&
		$signerAddress &&
		($signerAddress.toLowerCase() === owner.toLowerCase() ||
			(approved && $signerAddress.toLowerCase() === approved.toLowerCase()));

	const updateDefinition = async () => {
		const contract = await getContractWithProvider($provider);

		await contract.definition(tokenId, definition);
	};

	const updateExample = async () => {
		const contract = await getContractWithProvider($provider);

		await contract.example(tokenId, example);
	};

	const displayAddress = (address: string) => address.slice(0, 8);
	$: console.log($provider, $connected, $signerAddress, owner, approved);
</script>

<div class="space-y-4 text-lg">
	<div class="space-y-4 w-2/3">
		{#if definition || canOperate}
			<EditableTextArea
				title="definition"
				value={definition}
				placeholder="add a definition"
				editable={canOperate}
				onSave={updateDefinition}
			/>
		{/if}
		{#if example || canOperate}
			<EditableTextArea
				title="example"
				value={example}
				placeholder="add an example"
				editable={canOperate}
				onSave={updateExample}
			/>
		{/if}
	</div>
	<div>
		<h3 class="text-gray-500">metadata</h3>
		<div
			class="w-full flex flex-wrap flex-col space-y-1 md:flex-row md:space-x-8 md:space-y-0 text-gray-700 text-base"
		>
			<div>#{number}</div>
			<div>
				owned by
				<a
					rel="external"
					target="_blank"
					class="text-blue-400"
					href="{blockExplorerURI}/address/{owner}"
				>
					{displayAddress(owner)}...
				</a>
			</div>
			<div>
				view on
				<a
					rel="external"
					target="_blank"
					class="text-blue-400"
					href="{blockExplorerURI}/token/{lexiconomyAddress}?a={tokenId.toString()}#inventory"
				>
					block explorer
				</a>
			</div>

			<div>
				trade on
				<a
					rel="external"
					target="_blank"
					class="text-blue-400"
					href="{openSeaURI}/assets/{lexiconomyAddress}/{tokenId.toString()}"
				>
					OpenSea
				</a>
				or
				<a
					rel="external"
					target="_blank"
					class="text-blue-400"
					href="{raribleURI}/token/{lexiconomyAddress}:{tokenId.toString()}"
				>
					Rarible
				</a>
			</div>
		</div>
	</div>
</div>

<style>
</style>
