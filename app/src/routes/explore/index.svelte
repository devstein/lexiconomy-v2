<script lang="ts" context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import { getColorPalette } from '$lib/nft/color';
	export let lemmas: string[] = [];
	// TODO: Filter lemmas by search bar
</script>

<div class="h-full mt-8">
	<ul class="h-full flex flex-row flex-wrap justify-start items-center content-center break-words">
		{#each lemmas as item}
			<li
				class="h-32 min-w-32 mr-4 my-4 px-2 rounded"
				style:background-color={getColorPalette(item).background}
			>
				<a
					sveltekit:prefetch
					href="/lemma/{item}"
					class="h-full font-mono text-center text-lg font-semibold font-semibold flex flex-col justify-center items-center break-all"
					style:color={getColorPalette(item).primary}
				>
					{item}
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
