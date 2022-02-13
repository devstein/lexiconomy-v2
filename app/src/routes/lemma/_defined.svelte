<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import type { BigNumber } from 'ethers';
	import { connected, signerAddress, provider } from 'svelte-ethers-store';

	import { getContractWithProvider } from '$lib/web3/contract';
	import EditableTextArea from '$lib/components/EditableTextArea.svelte';

	// pass lemma as prop
	export let tokenId: BigNumber;
	export let number: BigNumber;
	export let definition: string;
	export let example: string;
	export let owner: string;
	export let approved: string;

	const ZERO_ADDR = '0x0000000000000000000000000000000000000000';

	const exists = Boolean(owner) && owner !== ZERO_ADDR;
	let canOperate = false;

	const blockExplorerURI = 'https://ropsten.etherscan.io';
	const contractAddress = '0xa4097dadaa50dbe0fef2dd2d5c6699a930f287a6';

	onMount(async () => {
		if (!($connected && exists)) return;

		canOperate =
			$signerAddress.toLowerCase() === owner.toLowerCase() ||
			$signerAddress.toLowerCase() === approved.toLowerCase();
	});

	const updateDefinition = async () => {
		const contract = await getContractWithProvider($provider);

		await contract.definition(tokenId, definition);
	};

	const updateExample = async () => {
		const contract = await getContractWithProvider($provider);

		await contract.example(tokenId, example);
	};

	const displayAddress = (address: string) => address.slice(0, 8);
</script>

<div class="space-y-4 text-lg w-2/3">
	{#if definition || canOperate}
		<div>
			<h3 class="section">definition</h3>
			<EditableTextArea
				label="definition"
				value={definition}
				placeholder="add a definition"
				editable={canOperate}
				onSave={updateDefinition}
			/>
		</div>
	{/if}
	{#if example || canOperate}
		<div>
			<h3 class="section">example</h3>
			<EditableTextArea
				value={example}
				placeholder="add an example"
				editable={canOperate}
				onSave={updateExample}
			/>
		</div>
	{/if}
	<div>
		<h3 class="section">metadata</h3>
		<div class="flex flex-row flex-wrap space-x-8 text-gray-700 text-base">
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
					href="{blockExplorerURI}/token/{contractAddress}?a={tokenId}#inventory"
				>
					block explorer
				</a>
			</div>

			<div>
				trade on
				<a rel="external" target="_blank" class="text-blue-400" href="https://testnets.opensea.io/">
					OpenSea
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.section {
		@apply text-gray-500;
	}
</style>
