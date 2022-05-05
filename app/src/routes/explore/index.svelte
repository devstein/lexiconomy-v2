<script lang="ts" context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import { getColor } from '$lib/nft/color';
	export let lemmas: object[] = [];

	// try a word cloud / randomize order?
</script>

<h1 class="text-5xl pb-4 mb-8 border-b-4 border-green-400">explore</h1>
<div class="h-full">
	<ul class="h-full flex flex-row flex-wrap justify-start items-center content-center break-words">
		{#each lemmas as item}
			<li class="h-32 min-w-32 mr-4 my-4 px-2" style:background-color={getColor(item)}>
				<a
					sveltekit:prefetch
					href="/lemma/{item}"
					class="h-full font-mono text-center text-lg font-semibold font-semibold flex flex-col justify-center items-center break-all"
				>
					{item}
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
