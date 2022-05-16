<script lang="ts" context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import { ZERO_ADDR } from '$lib/web3/utils';
	import { getColorPalette } from '$lib/nft/color';

	import UndefinedState from './_undefined.svelte';
	import DefinedState from './_defined.svelte';

	export let lemma: string;
	export let tokenId: string;
	export let number: string;

	export let definition: string;
	export let example: string;

	export let owner: string;
	export let approved: string;

	export let chainId: number;

	let exists = false;
	let { background, primary, secondary } = getColorPalette(lemma);

	$: exists = Boolean(owner) && owner !== ZERO_ADDR;

	$: ({ background, primary, secondary } = getColorPalette(lemma));
</script>

<h1 class="text-4xl md:text-5xl mb-4 md:mb-8">
	<div class="font-mono mb-1">{lemma}</div>
	<div class="border-b-4 mb-0.5" style:border-color={background} />
	<div class="border-b-4 mb-0.5" style:border-color={primary} />
	<div class="border-b-4 mb-0.5" style:border-color={secondary} />
</h1>

{#if exists}
	<DefinedState {lemma} {chainId} {tokenId} {number} {example} {definition} {owner} {approved} />
{:else}
	<UndefinedState {lemma} />
{/if}
