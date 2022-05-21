<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import domtoimage from 'dom-to-image';
	import { getColorPalette } from '$lib/nft/color';

	export let lemma: string;
	export let number: string;

	let { background, primary, secondary } = getColorPalette(lemma);
	let node: HTMLDivElement;

	const transform = async () => {
		domtoimage.toSvg(node).then(function (dataUrl: string) {
			var img = new Image();
			img.src = dataUrl;
			document.body.appendChild(img);
		});
	};
</script>

<div class="flex flex-row space-x-4 my-4">
	<div>
		Background
		<input bind:value={background} />
	</div>
	<div>
		Primary
		<input bind:value={primary} />
	</div>
	<div>
		Secondary
		<input bind:value={secondary} />
	</div>
</div>

<div
	bind:this={node}
	class="size p-2 rounded flex flex-col align-start h-full relative"
	style:background-color={background}
>
	<div
		class="flex-1 flex flex-col justify-center font-mono text-3xl text-center"
		style:color={primary}
	>
		{lemma}
	</div>
	<div class="absolute bottom-2 right-2 text-sm" style:color={secondary}>#{number}</div>
</div>

<button class="my-4" on:click={transform}>Transform into an SVG</button>

<style>
	.size {
		height: 350px;
		width: 350px;
	}

	@font-face {
		font-family: 'Berkeley Mono';
		font-style: normal;
		font-weight: 400;
		font-display: swap;

		src: url('/fonts/BerkeleyMono-Regular.woff2') format('woff2'),
			url('/fonts/BerkeleyMono-Regular.woff') format('woff');
	}

	@font-face {
		font-family: 'Berkeley Mono';
		font-style: normal;
		font-weight: 600;
		font-display: swap;

		src: url('/fonts/BerkeleyMono-Bold.woff2') format('woff2'),
			url('/fonts/BerkeleyMono-Bold.woff') format('woff');
	}

	@font-face {
		font-family: 'Berkeley Mono';
		font-style: normal;
		font-weight: bold;
		font-display: swap;

		src: url('/fonts/BerkeleyMono-Bold.woff2') format('woff2'),
			url('/fonts/BerkeleyMono-Bold.woff') format('woff');
	}
</style>
