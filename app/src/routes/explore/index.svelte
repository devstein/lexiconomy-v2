<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	export let lemmas: object[] = [];

	export const getColor = (lemma: string) => {
		const colors = [
			'#fea3aa80', // salmon-ish
			'#f8b88b66', // light orange
			'#fef16073', // yellow
			'#baed9173', // green
			'#b2cefe80', // purple blue
			'#f2a2e84d', // pink
			'#b0f4e880', // light blue green
			'#a7f69a66', // green
			'#f4a1a180', // a pink
			'#f6b6f180', // a pink
			'#edf29280', // a yellow
			'#6eb5ff73', // a green
			'#77dd7780', // a green
			'#ffcb0573' // orange
		];

		const lemmaCode =
			lemma.length === 1
				? lemma.codePointAt(0)
				: lemma.split('').reduce((sum = 0, char, index) => sum + char.codePointAt(0) * index, 0);

		const colorPosition = lemmaCode % colors.length;

		return colors[colorPosition];
	};

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
