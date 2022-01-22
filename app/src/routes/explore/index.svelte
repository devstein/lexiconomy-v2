<script lang="ts">
	import Header from '$lib/components/Header.svelte';

	const items = [
		'lemma',
		'lexiconomy',
		'characters',
		'nnmbl',
		'something',
		'another',
		'g',
		'h',
		'something really long',
		'a really really really really long'
	];

	// generate color based off word
</script>

<Header />

<div class="px-8 py-4 h-full">
	<ul class="h-full grid grid-cols-5 gap-5 place-items-center break-words">
		{#each items as item}
			<li class="h-4/5 w-4/5 scene">
				<div class="card p-2 rounded">
					<a
						href="/lemma/{item}"
						class="text-center text-lg font-semibold card__face font-semibold flex flex-col justify-center items-center"
					>
						<div class="mx-2 font-mono">
							{item}
						</div>
					</a>
					<a href="/lemma/{item}" class="card__face card__face--back">
						<div class="m-4 space-y-2">
							<div>the world's decentralized dictionary</div>
							<div class="italic">i coined that phrase on the lexiconomy</div>
						</div>
					</a>
				</div>
			</li>
		{/each}
	</ul>
	<div>Navigate pages</div>
</div>

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
