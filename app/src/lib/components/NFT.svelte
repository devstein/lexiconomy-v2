<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { getColorPalette } from '$lib/nft/color';

	export let lemma: string;
	export let number: string;
	export let { background, primary, secondary } = getColorPalette(lemma);

	// TODO: Can we expose the bind:this={node} to the parent?
</script>

<div
	class="p-2 rounded flex flex-col align-start h-full w-full"
	style:background-color={background}
>
	<div
		class="flex-1 flex flex-col justify-center font-mono text-3xl text-center"
		style:color={primary}
	>
		{lemma}
	</div>
	<div class="align-self-end flex flex-row-reverse items-end text-sm" style:color={secondary}>
		#{number}
	</div>
</div>
