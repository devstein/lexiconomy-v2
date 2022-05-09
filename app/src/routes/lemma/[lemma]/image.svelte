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
		class="flex-1 flex flex-col justify-center font-mono text-3xl font-semibold text-center"
		style:color={primary}
	>
		{lemma}
	</div>
	<div class="align-self-end flex flex-row-reverse items-end text-sm" style:color={secondary}>
		#{number}
	</div>
</div>

<button class="my-4" on:click={transform}>Transform into an SVG</button>

<style>
	.size {
		height: 350px;
		width: 350px;
	}

	/* cyrillic-ext */
	@font-face {
		font-family: 'IBM Plex Mono';
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/ibmplexmono/v12/-F63fjptAgt5VM-kVkqdyU8n1iIq131nj-otFQ.woff2)
			format('woff2');
		unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
	}
	/* cyrillic */
	@font-face {
		font-family: 'IBM Plex Mono';
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/ibmplexmono/v12/-F63fjptAgt5VM-kVkqdyU8n1isq131nj-otFQ.woff2)
			format('woff2');
		unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
	}
	/* vietnamese */
	@font-face {
		font-family: 'IBM Plex Mono';
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/ibmplexmono/v12/-F63fjptAgt5VM-kVkqdyU8n1iAq131nj-otFQ.woff2)
			format('woff2');
		unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0,
			U+1EA0-1EF9, U+20AB;
	}
	/* latin-ext */
	@font-face {
		font-family: 'IBM Plex Mono';
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/ibmplexmono/v12/-F63fjptAgt5VM-kVkqdyU8n1iEq131nj-otFQ.woff2)
			format('woff2');
		unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113,
			U+2C60-2C7F, U+A720-A7FF;
	}
	/* latin */
	@font-face {
		font-family: 'IBM Plex Mono';
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/ibmplexmono/v12/-F63fjptAgt5VM-kVkqdyU8n1i8q131nj-o.woff2)
			format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
</style>
