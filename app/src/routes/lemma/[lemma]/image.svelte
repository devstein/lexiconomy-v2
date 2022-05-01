<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import domtoimage from 'dom-to-image';

	let node: HTMLDivElement;

	export let lemma: string;
	export let number: string;

	export let definition: string;
	export let example: string;

	const transform = async () => {
		domtoimage.toSvg(node).then(function (dataUrl: string) {
			var img = new Image();
			img.src = dataUrl;
			document.body.appendChild(img);
		});
	};

	// option
	// if no definition and example, show word in center with color background
	// pick color, background etc based of token
</script>

<button on:click={transform}>Transform into an SVG</button>

<div bind:this={node} class="bg-white size p-2 rounded flex flex-col align-start h-full">
	<div class="my-2 font-mono text-3xl font-semibold text-center color">{lemma}</div>
	<div class="mx-2 space-y-2 text-sm">
		<div>
			<div class="text-sm color">definition</div>
			<div class="text-sm truncate-overflow">
				{definition ||
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'}
			</div>
		</div>
		<div>
			<div class="text-sm text-gray-700 color">example</div>
			<div class="italic text-sm truncate-overflow">
				{example ||
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'}
			</div>
		</div>
	</div>
	<div class="flex-1 align-self-end flex flex-row-reverse items-end text-sm">#{number}</div>
</div>

<style>
	.size {
		height: 350px;
		width: 350px;
	}

	/* Add an arrow for definition  */
	:root {
		--green-pastel: #d1f7c4;
		--blue-pastel: #d0f0fd;
		--dark-blue-pastel: #9cf;
		--dark-orange-pastel: #eba134;
		--light-orange-pastel: #f2c17a;
	}

	.color {
		color: var(--dark-orange-pastel);
	}

	.truncate-overflow {
		display: -webkit-box;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
		overflow: hidden;
		white-space: pre-line;
	}
</style>
