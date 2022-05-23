<script lang="ts" context="module">
	// different user see different content if canOperate
	export const prerender = false;
</script>

<script lang="ts">
	import { connected, signerAddress, provider, chainId } from 'svelte-ethers-store';

	import { LEXICONOMY_CONTRACT_ADDRESS, getContractWithProvider } from '$lib/web3/contract';
	import chainInfo from '$lib/web3/chains';
	import { getColorPalette } from '$lib/nft/color';

	import EditableTextArea from '$lib/components/EditableTextArea.svelte';
	import NFT from '$lib/components/NFT.svelte';

	export let lemma: string;
	export let tokenId: string;
	export let number: string;
	export let definition: string;
	export let example: string;
	export let owner: string;
	export let ownerDisplayName: string;
	export let approved: string;

	export let serverChainId: number;

	let canOperate = false;

	const { blockExplorerURI, openSeaURI, raribleURI } = chainInfo[serverChainId];

	$: ({ background, primary, secondary } = getColorPalette(lemma));

	$: canOperate =
		$connected &&
		// $chainId can be #, '#', or '0x#'. parseInt handles all gracefully
		parseInt($chainId as string) === serverChainId &&
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
</script>

<div class="space-y-4 text-lg">
	<div class="flex flex-col-reverse md:flex-row">
		<div>
			<h3 class="md:hidden text-gray-500">nft</h3>
			<div class="mr-8 h-72 w-72">
				<NFT {lemma} {number} />
			</div>
		</div>
		<div class="space-y-4 flex-1">
			<EditableTextArea
				title="definition"
				bind:value={definition}
				placeholder={canOperate ? 'add a definition' : 'n/a'}
				editable={canOperate}
				onSave={updateDefinition}
			/>
			<EditableTextArea
				title="example"
				bind:value={example}
				placeholder={canOperate ? 'add an example' : 'n/a'}
				editable={canOperate}
				onSave={updateExample}
				additionalClasses="italic"
			/>
		</div>
	</div>
	<div>
		<h3 class="text-gray-500">metadata</h3>
		<div
			class="w-full flex flex-wrap flex-col space-y-1 md:flex-row md:items-center md:space-x-8 md:space-y-0 text-gray-700 text-base"
		>
			<div>#{number}</div>
			<div class="flex flex-row flex-nowrap items-center space-x-1">
				<div class="w-4 h-4 border" style:background-color={background} />
				<div>background</div>
			</div>
			<div class="flex flex-row flex-nowrap items-center space-x-1">
				<div class="w-4 h-4 border" style:background-color={primary} />
				<div>primary</div>
			</div>
			<div class="flex flex-row flex-nowrap items-center space-x-1">
				<div class="w-4 h-4 border" style:background-color={secondary} />
				<div>secondary</div>
			</div>
			<div>
				owned by
				<a
					rel="external"
					target="_blank"
					class="text-blue-400"
					href="{blockExplorerURI}/address/{owner}"
				>
					{ownerDisplayName}
				</a>
			</div>

			<div>
				trade on
				<a
					rel="external"
					target="_blank"
					class="text-blue-400"
					href="{openSeaURI}/assets/{LEXICONOMY_CONTRACT_ADDRESS}/{tokenId.toString()}"
				>
					OpenSea
				</a>
				or
				<a
					rel="external"
					target="_blank"
					class="text-blue-400"
					href="{raribleURI}/token/{LEXICONOMY_CONTRACT_ADDRESS}:{tokenId.toString()}"
				>
					Rarible
				</a>
			</div>

			<div>
				view on
				<a
					rel="external"
					target="_blank"
					class="text-blue-400"
					href="{blockExplorerURI}/token/{LEXICONOMY_CONTRACT_ADDRESS}?a={tokenId.toString()}#inventory"
				>
					block explorer
				</a>
			</div>
		</div>
	</div>
</div>
