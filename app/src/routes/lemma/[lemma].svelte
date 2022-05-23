<script lang="ts" context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import { isZeroAddr } from '$lib/web3/utils';
	import { getColorPalette } from '$lib/nft/color';
	import lemmas from '$lib/web3/store';

	import UndefinedState from './_undefined.svelte';
	import DefinedState from './_defined.svelte';

	export let lemma: string;
	export let tokenId: string;
	export let number: string;

	export let definition: string;
	export let example: string;

	export let owner: string;
	export let ownerDisplayName: string;
	export let approved: string;

	export let chainId: number;

	let exists = false;

	$: exists = Boolean(owner) && !isZeroAddr(owner);
	$: ({ background, primary, secondary } = getColorPalette(lemma));

	// Update lemma when event comes through
	lemmas.subscribe((value) => {
		const updates = value[tokenId];

		if (!updates) return;

		owner = updates?.owner || owner;
		definition = updates?.definition || definition;
		example = updates?.example || example;
		number = updates?.number || number;
	});
</script>

<svelte:head>
	<title>{lemma}</title>
	<meta
		name="description"
		content={`Discover the meaning and usage of ${lemma} in the lexiconomy`}
	/>
</svelte:head>

<h1 class="text-4xl md:text-5xl mb-4 md:mb-8">
	<div class="font-mono mb-1">{lemma}</div>
	<div class="border-b-4 mb-0.5" style:border-color={background} />
	<div class="border-b-4 mb-0.5" style:border-color={primary} />
	<div class="border-b-4 mb-0.5" style:border-color={secondary} />
</h1>

{#if exists}
	<DefinedState
		{lemma}
		{tokenId}
		{number}
		{example}
		{definition}
		{owner}
		{ownerDisplayName}
		{approved}
		serverChainId={chainId}
	/>
{:else}
	<UndefinedState {lemma} />
{/if}
