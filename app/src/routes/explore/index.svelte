<script lang="ts" context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import { getColorPalette } from '$lib/nft/color';

	export let lemmas: string[] = [];
	// TODO: Pagination
	// TODO: Fuzzy Search by Global Search Value
	// TODO: Update lemma when event comes through
</script>

<svelte:head>
	<title>explore</title>
	<meta name="description" content="explore endless possibilities of the lexiconomy" />
</svelte:head>

<ul class="h-full flex flex-row flex-wrap justify-start items-center content-center break-words">
	{#each lemmas as item}
		<li
			class="h-16 min-w-16 mr-2 md:h-32 md:min-w-32 md:mr-4 my-4 px-2 rounded shadow-none	hover:shadow-lg transition duration-400 transition-shadow"
			style:background-color={getColorPalette(item).background}
		>
			<a
				sveltekit:prefetch
				href="/lemma/{encodeURIComponent(item)}"
				class="h-full font-mono text-center md:text-lg flex flex-col justify-center items-center break-all"
				style:color={getColorPalette(item).primary}
			>
				{item}
			</a>
		</li>
	{/each}
</ul>
