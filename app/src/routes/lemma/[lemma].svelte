<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import type { BigNumber } from 'ethers';

	import { ZERO_ADDR } from '$lib/web3/utils';

	import UndefinedState from './_undefined.svelte';
	import DefinedState from './_defined.svelte';

	export let lemma: string;
	export let tokenId: string;
	export let number: BigNumber;

	export let definition: string;
	export let example: string;

	export let owner: string;
	export let approved: string;

	export let chainId: number;

	const exists = Boolean(owner) && owner !== ZERO_ADDR;

	console.log(owner, approved, tokenId, lemma);
</script>

<h1 class="text-5xl pb-4 mb-8 border-b-4 border-yellow-400">{lemma}</h1>
{#if exists}
	<DefinedState {chainId} {tokenId} {number} {example} {definition} {owner} {approved} />
{:else}
	<UndefinedState {lemma} />
{/if}
