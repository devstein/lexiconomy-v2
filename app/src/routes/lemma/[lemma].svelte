<script lang="ts" context="module">
	export const prerender = true;

	export async function load({ params }) {
		const { lemma } = params;

		return {
			props: {
				lemma,
				tokenId: 123,
				definition: "the world's first decentralized dictionary",
				example: 'i coined it first on the lexiconomy',
				owner: '0xa4097dadaa50dbe0fef2dd2d5c6699a930f287a6'
			}
		};
	}
</script>

<script lang="ts">
	import type { BigNumber } from 'ethers';

	import UndefinedState from './_undefined.svelte';
	import DefinedState from './_defined.svelte';

	export let lemma: string;
	export let tokenId: BigNumber;

	export let definition: string;
	export let example: string;

	export let owner: string;
	export let approved: string;

	const ZERO_ADDR = '0x0000000000000000000000000000000000000000';

	// TODO: Remove
	const exists = true || (Boolean(owner) && owner !== ZERO_ADDR);

	console.log(owner, approved, tokenId, lemma);
</script>

<h1 class="text-5xl pb-4 mb-8 border-b-4 border-yellow-400">{lemma}</h1>
{#if exists}
	<DefinedState {tokenId} {example} {definition} {owner} {approved} />
{:else}
	<UndefinedState {lemma} />
{/if}
