<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	export let lemmas: object[] = [];

	// try a word cloud / randomize order?
</script>

<h1 class="text-5xl pb-4 mb-8 border-b-4 border-green-400">explore</h1>
<div class="px-8 py-4 h-full">
	<ul class="h-full grid grid-cols-5 gap-5 place-items-center break-words">
		{#each lemmas as item}
			<li class="bg-blue-100 ">
				<a
					sveltekit:prefetch
					href="/lemma/{item}"
					class="text-center text-lg font-semibold font-semibold flex flex-col justify-center items-center"
				>
					<div class="mx-2 font-mono">
						{item}
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>
<div class="my-8">Navigate pages</div>

<style>
	/* Add an arrow for definition  */
	:root {
		--green-pastel: #d1f7c4;
		--blue-pastel: #d0f0fd;
		--dark-blue-pastel: #9cf;
		--dark-orange-pastel: #eba134;
		--light-orange-pastel: #f2c17a;
	}

	.scene {
		perspective: 1000px;
		width: 350px;
		height: 350px;
	}

	.card {
		width: 100%;
		height: 100%;
		position: relative;
		transition: transform 0.75s;
		transform-style: preserve-3d;
	}

	.card__face {
		width: 100%;
		height: 100%;
		position: absolute;
		backface-visibility: hidden;
		background-color: #d0f0fd;
	}

	.card__face--back {
		width: 100%;
		height: 100%;
		transform: rotateY(180deg);
		background-color: #f2c17a;
	}

	.card:hover {
		transform: rotateY(180deg);
		transition: transform 0.75s;
	}
	/* class="text-lg font-semibold border-b-4 border-[#9cf] border-dotted pb-1 card__face" */
</style>
