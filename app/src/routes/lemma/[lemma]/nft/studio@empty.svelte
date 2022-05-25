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
	class="size p-2 rounded flex flex-col align-start h-full"
	style:background-color={background}
>
	<div
		class="flex-1 flex flex-col justify-center font-mono text-3xl text-center"
		style:color={primary}
	>
		{lemma}
	</div>
	<div class="flex flex-row-reverse text-sm" style:color={secondary}>#{number}</div>
</div>

<button class="my-4" on:click={transform}>Transform into an SVG</button>

<style>
	.size {
		height: 350px;
		width: 350px;
	}

	/* latin-ext */
	@font-face {
		font-family: 'Oxygen';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(https://fonts.gstatic.com/s/oxygen/v15/2sDfZG1Wl4LcnbuKgE0mRUe0A4Uc.woff2)
			format('woff2');
		unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113,
			U+2C60-2C7F, U+A720-A7FF;
	}
	/* latin */
	@font-face {
		font-family: 'Oxygen';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(https://fonts.gstatic.com/s/oxygen/v15/2sDfZG1Wl4LcnbuKjk0mRUe0Aw.woff2)
			format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
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
